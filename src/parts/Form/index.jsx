'use client';

// Imports
// ------------
import React, { useState, useEffect, useRef, useContext } from 'react';
import init, { Network, NodeClient, NodeConfig } from '@public/lumina-node-wasm';
import Textarea from './Textarea';
import Button from '@parts/Button';
import Status from './Status';
import Terminal from './Terminal';
import Icon from '@icon';
import Typewriter from 'typewriter-effect';
import { GlobalContext } from '@parts/Contexts';
import { browserName, browserVersion } from 'react-device-detect';

// Styles
// ------------
import { Blanket, Jacket, ImageContainer, Container, Title, NetworkList, NetworkItem } from './styles';

// Component
// ------------
const Form = () => {
    // NOTE • Contexts
    const { begin, setBegin } = useContext(GlobalContext);

    // NOTE • States
    const [display, setDisplay] = useState(false);
    const [node, setNode] = useState();
    const [_events, setEvents] = useState();
    const [network, setNetwork] = useState();
    const [bootnodes, setBootnodes] = useState([]);

    const [combinedConfig, setCombinedConfig] = useState({
        bootnodes: bootnodes,
    });

    const [go, setGo] = useState(false);
    const [modalOpen, setModalOpen] = useState({
        modal1: false,
        modal2: false,
    });
    const [nodeInitiate, setNodeInitiate] = useState(false);
    const [statusInitiated, setStatusInitiated] = useState(false);
    const [nodeStatus, setNodeStatus] = useState('Downloading');
    const [eventData, setEventData] = useState([]);
    const [visualData, setVisualData] = useState([]);

    const [stats, setStats] = useState({
        peerId: '',
        storedRanges: [],
        approxSyncingWindowSize: (30 * 24 * 60 * 60)/12,
        syncedPercentage: 0,
        connectedPeers: [],
        networkHeadHeight: '',
        networkHeadHash: '',
        networkHeadDataSquare: '',
    });

    // NOTE • Refs are needed to access state from within events.onmessage callbacks
    const statsRef = useRef(stats);
    const nodeRef = useRef(node);

    useEffect(() => {
        statsRef.current = stats;
    }, [stats]);

    useEffect(() => {
        nodeRef.current = node;
    }, [node]);

    // NOTE • Browser detection
    useEffect(() => {
        if(browserName === 'Chrome'
        || browserName === 'Firefox' && browserVersion >= 125) {
            setDisplay(true)
        } else (
            setDisplay(false)
        )
    }, []);

    const initConfig = () => {
        const tempConfig = NodeConfig.default(Network.Mainnet)
        setNetwork(tempConfig.network);
        // todo: remove it completely
        // setHash('this field will be removed');
        setBootnodes(tempConfig.bootnodes);
        setCombinedConfig(tempConfig);
    };

    const initWASM = async () => {
        try {
            await init();
            initConfig();
        } catch (error) {
            console.error('Failed to initialize WASM:', error);
        }
    };

    // NOTE • Load the config and initialize the WASM module when the page loads
    useEffect(() => {
        initWASM();
    }, []);

    // NOTE • Periodically poll node for data that doesn't come from events
    useEffect(() => {
        if(node) {
            const timer = setInterval(async () => {
                const peers = await node.connected_peers();

                setStats((stats) => {
                    return {
                        ...stats,
                        connectedPeers: peers,
                    }
                });
    
                setNodeStatus('Data availability sampling in progress');
            }, 2000);
    
            return () => clearInterval(timer);
        }
    }, [node]);

    const handleNetwork = (e) => {
        e.preventDefault();

        const number = parseInt(e.target.value);
        const newConfig = NodeConfig.default(number);
        setNetwork(number);

        setBootnodes(newConfig.bootnodes);
        setCombinedConfig(newConfig)
    }

    const handleBnodes = (e) => {
        e.preventDefault();

        // console.log(e.target.value.split('\n'));
        const value = e.target.value.split('\n');

        setBootnodes(value);
    }

    const handleBegin = () => {
        setBegin(true);
        setModalOpen(prev => ({
            ...prev,
            modal1: true,
        }));
    }

    const handleInput = (e) => {
        setStats({
            ...stats,
            [e.target.name]: e.target.value
        });
    }

    // NOTE • Start the node
    const startNode = async () => {
        if (!bootnodes || bootnodes.length === 0) {
            alert('Genesis hash and at least one bootnode are required.');
            return;
        }
        try {
            const logEvent = (event) => {
                // Skip noisy events
                if (event.data.get("event").type == "share_sampling_result") {
                    return;
                }

                const time = new Date(event.data.get("time"));

                const log = time.getHours().toString().padStart(2, '0')
                    + ":" + time.getMinutes().toString().padStart(2, '0')
                    + ":" + time.getSeconds().toString().padStart(2, '0')
                    + "." + time.getMilliseconds().toString().padStart(3, '0')
                    + ": " + event.data.get("message");

                setEventData((prev) => {
                    return [...prev, log];
                });
            }

            // called when DASer starts dasing another block
            const logVisual = (event) => {
                const heightToSample = event.height;
                const currentHead = statsRef.current.networkHeadHeight;
                // DASer samples new blocks and old blocks, only update visualizer for new ones
                if (currentHead && heightToSample >= currentHead) {
                    setVisualData(event);
                    return;
                }
            }

            // called when we have new head header
            const onNewHead = async (height) => {
                const header = await nodeRef.current.get_header_by_height(BigInt(height));

                setStats((stats) => {
                    return {
                        ...stats,
                        networkHeadHeight: height,
                        networkHeadHash: header.commit.block_id.hash,
                        networkHeadDataSquare: `${header.dah.row_roots.length}x${header.dah.column_roots.length} shares`,
                    }
                });
            }

            // called when we synchronized any headers
            const onAddedHeaders = async () => {
                const info = await nodeRef.current.syncer_info();
                const storedRanges = normalizeStoredRanges(info.subjective_head, info.stored_headers);
                const syncedPercentage = syncingPercentage(storedRanges);

                setStats((stats) => {
                    return {
                        ...stats,
                        storedRanges: storedRanges,
                        approxSyncingWindowSize: approxHeadersToSync,
                        syncedPercentage: syncedPercentage,
                    }
                });
            };
            
            // called on all events coming from node
            const onNodeEvent = async (event) => {
                if (!event.data) {
                    return;
                }

                logEvent(event);

                const event_data = event.data.get("event");
                switch (event_data.type) {
                    // Daser started sampling block
                    case "sampling_started":
                        logVisual(event_data);
                        break;
                    
                    // node finished initialization and got initial trusted head
                    case "fetching_head_header_finished":
                    // new header added from header-sub
                    case "added_header_from_header_sub":
                        // headers from header-sub must be new head
                        await onNewHead(event_data.height);
                        await onAddedHeaders();
                        break;

                    // syncer finished fetching next batch of headers
                    case "fetching_headers_finished":
                        // last header in batch *may* be a new head
                        const to_height = event_data.to_height;
                        if (statsRef.current.networkHeadHeight && to_height > statsRef.current.networkHeadHeight) {
                            await onNewHead(to_height);
                        };
                        await onAddedHeaders();
                        break;
                };
            }

            let newConfig = combinedConfig;
            setCombinedConfig({ bootnodes: bootnodes });

            const workerUrl = new URL('/worker.js', window.location.origin);
            const newNode = await new NodeClient(workerUrl.toJSON());
            setNode(newNode);

            const events = await newNode.events_channel();
            events.onmessage = onNodeEvent;
            setEvents(events);

            await newNode.start(newConfig);

            const lpid = await newNode.local_peer_id();
            
            setStats(prev => ({
                ...prev,
                peerId: lpid,
            }));
        } catch (error) {
            console.error("Error initializing Node:", error);
            console.dir(error);
        }
    };

    // NOTE • Node initiation (the terminal panel)
    const initiateNode = (e) => {
        e.preventDefault();

        setGo(true);
        setModalOpen(prev => ({
            ...prev,
            modal2: true,
        }));
        setNodeInitiate(true);
        setNodeStatus('Node Initializing');
    };

    useEffect(() => {
        if(nodeInitiate) {
            startNode();
            
            const timer = setTimeout(() => {
                setNodeInitiate(false);
                setStatusInitiated(true);
            }, 10500);
    
            return () => clearTimeout(timer);
        }
    }, [nodeInitiate]);


    // Predicted amount of headers in syncing window (last 30 days / ~12s block time)
    const approxHeadersToSync = (30 * 24 * 60 * 60)/12;

    // Takes network head and ranges of headers node synchronized and calculates ranges
    // position inside the syncing window
    const normalizeStoredRanges = (networkHead, storedRanges) => {
        const syncingWindowTail = networkHead - approxHeadersToSync;
        // Normalize stored ranges wrt their position in syncing window
        const normalizedRanges = storedRanges.map((range) => {
            const adjustedStart = Math.max(range.start, syncingWindowTail);
            const adjustedEnd = Math.max(range.end, syncingWindowTail);
            return { 
                start: adjustedStart,
                end: adjustedEnd
            };
        });

        return normalizedRanges;
    };

    // calculate what percentage of syncing window the stored ranges occupy
    const syncingPercentage = (normalizedRanges) => {
        return (normalizedRanges.reduce((acc, range) => acc + (range.end - range.start), 0) * 100) / approxHeadersToSync;
    };


    // NOTE • Reload the page
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Blanket>
            <ImageContainer $active={begin}>
                <img src="/lumina.svg" alt="Lumina Logo" />
            </ImageContainer>

            <Jacket data-lenis-prevent style={{ zIndex: 1}}>
                <Container $begin>
                    {
                        display ? (
                            <>
                                <Title>
                                    <Typewriter
                                        options={{
                                            delay: 25,
                                            deleteSpeed: 25,
                                            changeDelay: 25,
                                        }}
                                        onInit={(typewriter) => {
                                            typewriter.typeString('Start your Celestia light node')
                                            .changeDelay(25)
                                            .changeDeleteSpeed(25)
                                            .start();
                                        }}
                                    />
                                </Title>
                                <Button label="Start Sampling" onClick={handleBegin} />
                            </>
                        ) : (
                            <>
                                <Title>
                                    <Typewriter
                                        options={{
                                            delay: 25,
                                            deleteSpeed: 25,
                                            changeDelay: 25,
                                        }}
                                        onInit={(typewriter) => {
                                            typewriter.typeString('Please use one of the supported browsers: Windows/MacOS: Chrome, Firefox >v125. Linux: Chrome, Firefox. Android or iOS.')
                                            .changeDelay(25)
                                            .changeDeleteSpeed(25)
                                            .start();
                                        }}
                                    />
                                </Title>
                            </>
                        )
                    }

                </Container>
            </Jacket>

            <Jacket data-lenis-prevent $modal={2} style={{ zIndex: 2, pointerEvents: modalOpen.modal1 ? 'all' : 'none'}}>
                <Container $network $activated={begin}>
                    <Title>Let's go!</Title>

                    <h3>Network</h3>
                    <NetworkList>
                        <NetworkItem $selected={network === 0}>
                            <label>
                                <input type="radio" name="network" value="0" onChange={(e) => handleNetwork(e)} />
                                <Icon type="check" /><span>Mainnet</span>
                            </label>
                        </NetworkItem>
                        <NetworkItem $selected={network === 1}>
                            <label>
                                <input type="radio" name="network" value="1" onChange={(e) => handleNetwork(e)} />
                                <Icon type="check" /><span>Arabica</span>
                            </label>
                        </NetworkItem>
                        <NetworkItem $selected={network === 2}>
                            <label>
                                <input type="radio" name="network" value="2" onChange={(e) => handleNetwork(e)} />
                                <Icon type="check" /><span>Mocha</span>
                            </label>
                        </NetworkItem>
                    </NetworkList>

                    <h3>Bootnodes <small>(Each address on a new line)</small></h3>
                    <Textarea value={bootnodes} onChange={(e) => handleBnodes(e)} placeholder="Bootnodes..." />

                    <div>
                        <Button label="Start" onClick={initiateNode} />
                    </div>
                </Container>
            </Jacket>

            <Jacket
                data-lenis-prevent
                $modal={3}
                $statusInitiated={statusInitiated}
                style={{
                    zIndex: 3,
                    pointerEvents: modalOpen.modal2 ? 'all' : 'none'
                    }}
                >

                    <Container $go $activated={go}>
                        {nodeInitiate && (
                            <Terminal />
                        )}

                        {statusInitiated && (
                            <Status
                                status={nodeStatus}
                                stats={stats}
                                handleInput={handleInput}
                                handleReload={handleReload}
                                eventData={eventData}
                                visualData={visualData}
                            />
                        )}
                    </Container>
                
            </Jacket>
        </Blanket>
    );
};

export default Form;
