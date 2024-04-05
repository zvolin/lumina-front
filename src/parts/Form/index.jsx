// 'use client';

// Imports
// ------------
import React, { useState, useLayoutEffect, useEffect } from 'react';
import init, { Node, NodeConfig, Network } from '@package/lumina-node-wasm';
import Input from './Input';
import { Grid } from '@waffl';

// Styles
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Form = () => {
    const [node, setNode] = useState(null);
    const [config, setConfig] = useState({});
    const [peerId, setPeerId] = useState('');
    const [syncInfo, setSyncInfo] = useState('');
    const [connectedPeers, setConnectedPeers] = useState([]);
    const [networkHead, setNetworkHead] = useState(null);

    // NOTE • Initialisation
    const fetchConfig = async () => {
        try {
            const response = await fetch('/cfg.json');
            if (!response.ok) {
                throw new Error('Failed to fetch configuration');
            }
            const json = await response.json();
    
            // Perform validation if necessary
            const config = NodeConfig.default(json.network);

            console.log('Fetched config:', config); // Debugging
    
            return config;
        } catch (error) {
            console.error('Error fetching configuration:', error);
            return null; // or handle the error in an appropriate way
        }
    };

    useEffect(() => {
        const loadConfig = async () => {
            const config = await fetchConfig();
            if (config) {
                console.log('Setting config to state:', config); // Debugging
                setConfig(config);
            }
        };

        const initWASM = async () => {
            await init();
            loadConfig();
        };

        initWASM();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (node) {
                const info = await node.syncer_info();
                setSyncInfo(`${info.local_head}/${info.subjective_head}`);

                const peers = await node.connected_peers();
                setConnectedPeers(peers);

                const head = node.get_network_head_header();
                if (head) {
                    setNetworkHead({
                        height: head.header.height,
                        hash: head.commit.block_id.hash,
                        dataSquare: `${head.dah.row_roots.length}x${head.dah.column_roots.length} shares`,
                    });
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [node]);

    const startNode = async () => {
        if(config.genesis_hash === '' || config.bootnodes.length === 0) {
            alert('Genesis hash and bootnodes are required');
            return;
        } else {
            try {
                const newNode = await new Node(config);
                console.log("Node initialized successfully:", newNode);
                console.log(config);
                setNode(newNode);
                setPeerId(await newNode.local_peer_id());
            } catch (error) {
                console.error("Error initializing Node:", error);
            }
        }
    };

    const handleGhash = (e) => {
        setConfig({
            ...config,
            genesis_hash: e.target.value
        });
    }

    const handleBnodes = (e) => {
        setConfig({
            ...config,
            bootnodes: [e.target.value]
        });
    }

    // useEffect(() => {
    //     console.log(config);
    // }, [config]);

    return (
        <Grid>
            <Jacket $small="1/3" $medium="1/7" $large="1/13" $pad>
                <h3>Network</h3>
                <select id="network-id">
                    <option value="0">Mainnet</option>
                    <option value="1">Arabica</option>
                    <option value="2">Mocha</option>
                </select>

                <h3>Genesis Hash</h3>
                {/* <Input value={config.genesis_hash} onChange={handleGhash} placeholder="Genesis Hash" /> */}
                {config.genesis_hash ? config.genesis_hash : `Loading...`}

                <h3>Bootnodes</h3>

                <div>
                    <button onClick={startNode} disabled={node !== null || peerId !== ''}>Start Node</button>
                </div>

                <h2>Status</h2>

                <div>
                    <b>PeerId:</b>
                    <span>{peerId}</span>
                </div>

                <div>
                    <b>Synchronizing headers:</b>
                    <span>{syncInfo}</span>
                </div>

                <div>
                    <b>Network Head:</b>
                    <div>
                        <span>Height: {networkHead?.height}</span>
                        <span>Hash: {networkHead?.hash}</span>
                        <span>Data Square: {networkHead?.dataSquare}</span>
                    </div>
                </div>

                <div>
                    <b>Peers:</b>
                    <ul>
                        {connectedPeers?.map((peer, index) => (
                            <li key={index} className="mono">{peer}</li>
                        ))}
                    </ul>
                </div>
            </Jacket>
        </Grid>
    );
};

export default Form;