'use client';

// Imports
// ------------
import React, { useState, useEffect, useContext } from 'react';
import init, { Network, NodeClient, NodeConfig } from '@public/lumina-node-wasm';
import Input from './Input';
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
    const [hash, setHash] = useState('');
    const [bootnodes, setBootnodes] = useState([]);

    const [combinedConfig, setCombinedConfig] = useState({
        genesis_hash: hash,
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

    // NOTE • Run node status checks and data fetching
    useEffect(() => {
        if(node) {
            const timer = setInterval(async () => {
                const info = await node.syncer_info();
                const peers = await node.connected_peers();
                const head = await node.get_network_head_header();

                if (head) {
                    const networkHead = head.header.height;
                    // Predicted amount of headers in syncing window (last 30 days / ~12s block time)
                    const approxHeadersToSync = (30 * 24 * 60 * 60)/12;
                    const syncingWindowTail = networkHead - approxHeadersToSync;
                    // Normalize stored ranges wrt their position in syncing window
                    const storedRanges = info.stored_headers.map((range) => {
                        const adjustedStart = Math.max(range.start, syncingWindowTail);
                        const adjustedEnd = Math.max(range.end, syncingWindowTail);
                        return { 
                            start: adjustedStart,
                            end: adjustedEnd
                        };
                    }).filter((range) => (range.end-range.start) > 10); // skip short < 10 header ranges

                    const syncedPercentage = (storedRanges.reduce((acc, range) => acc + (range.end - range.start), 0) * 100)/approxHeadersToSync;

                    setStats((stats) => {
                        return {
                            ...stats,
                            storedRanges: storedRanges,
                            approxSyncingWindowSize: approxHeadersToSync,
                            syncedPercentage: syncedPercentage,
                            connectedPeers: peers,
                            networkHeadHeight: networkHead,
                            networkHeadHash: head.commit.block_id.hash,
                            networkHeadDataSquare: `${head.dah.row_roots.length}x${head.dah.column_roots.length} shares`,
                        }
                    });
        
                    setNodeStatus('Data availability sampling in progress');
                }
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

    const handleGhash = (e) => {
        e.preventDefault();

        setHash(e.target.value);
    }

    const handleBnodes = (e) => {
        e.preventDefault();

        // console.log(e.target.value.split('\n').join(','));
        const value = e.target.value.split('\n').join(',');

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
            let newConfig = combinedConfig;
            setCombinedConfig({genesis_hash: hash, bootnodes: bootnodes});

            const workerUrl = new URL('/worker.js', window.location.origin);
            const newNode = await new NodeClient(workerUrl.toJSON());

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

            const logVisual = (event) => {
                // Only include sampling_started events
                if (event.data.get("event").type === "sampling_started") {
                    setVisualData(event);
                    return;
                }
            }

            const events = await newNode.events_channel();
            events.onmessage = (event) => {
                logEvent(event);
                logVisual(event);
            };

            await newNode.start(newConfig);

            setNode(newNode);
            setEvents(events);

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
                                            typewriter.typeString('Please use the latest version of Chrome or Firefox to start your Celestia light node')
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

                    {/* <h3>Genesis Hash</h3>
                    <Input value={hash && hash} onChange={(e) => handleGhash(e)} placeholder="Genesis Hash..." /> */}

                    <h3>Bootnodes <small>(Each address on a new line)</small></h3>
                    <Textarea value={bootnodes && bootnodes} onChange={(e) => handleBnodes(e)} placeholder="Bootnodes..." />

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
