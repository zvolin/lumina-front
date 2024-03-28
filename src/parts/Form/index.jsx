// Imports
// ------------
import React, { useState, useCallback, useEffect } from 'react';
import init, { Node, NodeConfig, Network } from '@package/lumina-node-wasm';
import { Grid } from '@waffl';

// Styles
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Form = () => {
    // NOTE • State
    const [nodeConfig, setNodeConfig] = useState(null);
    const [node, setNode] = useState(null);
    const [hasStarted, setHasStarted] = useState(false);

    // NOTE • Initialise logging
    const initLumina = useCallback(async () => {
        await init();

        const config = NodeConfig.default(Network.Mainnet);

        // Set the state of the node
        setNodeConfig(config);

        // console.log(nodeConfig?.genesis_hash);
        // console.log(nodeConfig?.bootnodes[0]);

        // const node = new Node(config);

        // await node.wait_connected();
        // await node.request_head_header();
    }, []);

    useEffect(() => {
        initLumina();
    }, [initLumina]);

    // NOTE • Events
    // const handleStart = async (e) => {
    //     e.preventDefault();

    //     const node = new Node(nodeConfig);

    //     await node.wait_connected();
    //     await node.request_head_header();

    //     setHasStarted(true);
    // }

    const handleStart = async (config, e) => {
        e.preventDefault();

        const newNode = new Node(config);
        setNode(newNode);

        setHasStarted(true);
    
        document.getElementById("peer-id").innerText = await newNode.local_peer_id();
        document.querySelectorAll(".status").forEach(elem => elem.style.visibility = "visible");
    };

    const handleGhash = (e) => {
        setNodeConfig({
            ...nodeConfig,
            genesis_hash: e.target.value
        });
    }

    const handleBnodes = (e) => {
        setNodeConfig({
            ...nodeConfig,
            bootnodes: [e.target.value]
        });
    }

    // NOTE • Render
    useEffect(() => {
        const showStats = async (node) => {
            if (!node) return;

            const info = await node.syncer_info();
            document.getElementById("syncer").innerText = `${info.local_head}/${info.subjective_head}`;

            let peersUl = document.createElement('ul');
            (await node.connected_peers()).forEach(peer => {
                var li = document.createElement("li");
                li.innerText = peer;
                li.classList.add("mono");
                peersUl.appendChild(li);
            });

            document.getElementById("peers").replaceChildren(peersUl);

            const networkHead = node.get_network_head_header();
            if (networkHead == null) return;

            const squareRows = networkHead.dah.row_roots.length;
            const squareCols = networkHead.dah.column_roots.length;

            document.getElementById("block-height").innerText = networkHead.header.height;
            document.getElementById("block-hash").innerText = networkHead.commit.block_id.hash;
            document.getElementById("block-data-square").innerText = `${squareRows}x${squareCols} shares`;
        };

        if (node) {
            showStats(node);
            const interval = setInterval(async () => await showStats(node), 1000);
            return () => clearInterval(interval);
        }
    }, [node]);


    // useEffect(() => {
    //     async function render() {
    //         const node = new Node(nodeConfig);

    //         setInterval(async () => await show_stats(node), 1000);
    //     }
    //     render();
    // }, [hasStarted]);

    return (
        <Grid>
            <Jacket $small="1/3" $medium="1/7" $large="1/13" $pad>
                <form>
                    <h3>Network</h3>
                    <select id="network-id" className="config">
                        <option value="0">Mainnet</option>
                        <option value="1">Arabica</option>
                        <option value="2">Mocha</option>
                        <option value="3">Private</option>
                    </select>

                    <h3>Genesis Hash</h3>
                    <input type="text" id="genesis-hash" className="config" size="64" onChange={handleGhash} value={nodeConfig?.genesis_hash} />

                    <h3>Bootnodes</h3>
                    <textarea id="bootnodes" className="config" cols="120" rows="8" onChange={handleBnodes} value={nodeConfig?.bootnodes[0]}></textarea>

                    <div>
                        <button onClick={() => handleStart(nodeConfig)}>Start!</button>
                    </div>

                    <h2 className="status">Status</h2>

                    <div className="status">
                        <b>PeerId:</b>
                        <span className="status-value" id="peer-id"></span>
                    </div>

                    <div className="status">
                        <b>Synchronizing headers:</b>
                        <span className="status-value" id="syncer"></span>
                    </div>

                    <div className="status">
                        <b>Latest block:</b>
                        <div className="latest-block">
                        <b>Height:</b>
                        <span className="status-value" id="block-height"></span>
                        </div>
                        <div className="latest-block">
                        <b>Hash:</b>
                        <span className="status-value" id="block-hash"></span>
                        </div>
                        <div className="latest-block">
                        <b>Data square size:</b>
                        <span className="status-value" id="block-data-square"></span>
                        </div>
                    </div>

                    <div className="status">
                        <b>Peers:</b>
                        <div className="status-value" id="peers"></div>
                    </div>
                </form>
            </Jacket>
        </Grid>
    );
}

export default Form;