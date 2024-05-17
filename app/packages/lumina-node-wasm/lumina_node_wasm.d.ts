/* tslint:disable */
/* eslint-disable */
/**
* Set up a logging layer that direct logs to the browser's console.
*/
export function setup_logging(): void;
/**
* Supported Celestia networks.
*/
export enum Network {
/**
* Celestia mainnet.
*/
  Mainnet = 0,
/**
* Arabica testnet.
*/
  Arabica = 1,
/**
* Mocha testnet.
*/
  Mocha = 2,
/**
* Private local network.
*/
  Private = 3,
}
/**
*/
export class ConnectionCounters {
  free(): void;
/**
*/
  readonly num_connections: number;
/**
*/
  readonly num_established: number;
/**
*/
  readonly num_established_incoming: number;
/**
*/
  readonly num_established_outgoing: number;
/**
*/
  readonly num_pending: number;
/**
*/
  readonly num_pending_incoming: number;
/**
*/
  readonly num_pending_outgoing: number;
}
/**
*/
export class NetworkInfo {
  free(): void;
/**
* @returns {ConnectionCounters}
*/
  connection_counters(): ConnectionCounters;
/**
*/
  readonly num_peers: number;
}
/**
* Lumina wasm node.
*/
export class Node {
  free(): void;
/**
* Create a new Lumina node.
* @param {NodeConfig} config
*/
  constructor(config: NodeConfig);
/**
* Get node's local peer ID.
* @returns {string}
*/
  local_peer_id(): string;
/**
* Get current [`PeerTracker`] info.
* @returns {any}
*/
  peer_tracker_info(): any;
/**
* Wait until the node is connected to at least 1 peer.
* @returns {Promise<void>}
*/
  wait_connected(): Promise<void>;
/**
* Wait until the node is connected to at least 1 trusted peer.
* @returns {Promise<void>}
*/
  wait_connected_trusted(): Promise<void>;
/**
* Get current network info.
* @returns {Promise<NetworkInfo>}
*/
  network_info(): Promise<NetworkInfo>;
/**
* Get all the multiaddresses on which the node listens.
* @returns {Promise<Array<any>>}
*/
  listeners(): Promise<Array<any>>;
/**
* Get all the peers that node is connected to.
* @returns {Promise<Array<any>>}
*/
  connected_peers(): Promise<Array<any>>;
/**
* Trust or untrust the peer with a given ID.
* @param {string} peer_id
* @param {boolean} is_trusted
* @returns {Promise<void>}
*/
  set_peer_trust(peer_id: string, is_trusted: boolean): Promise<void>;
/**
* Request the head header from the network.
* @returns {Promise<any>}
*/
  request_head_header(): Promise<any>;
/**
* Request a header for the block with a given hash from the network.
* @param {string} hash
* @returns {Promise<any>}
*/
  request_header_by_hash(hash: string): Promise<any>;
/**
* Request a header for the block with a given height from the network.
* @param {bigint} height
* @returns {Promise<any>}
*/
  request_header_by_height(height: bigint): Promise<any>;
/**
* Request headers in range (from, from + amount] from the network.
*
* The headers will be verified with the `from` header.
* @param {any} from
* @param {bigint} amount
* @returns {Promise<Array<any>>}
*/
  request_verified_headers(from: any, amount: bigint): Promise<Array<any>>;
/**
* Get current header syncing info.
* @returns {Promise<any>}
*/
  syncer_info(): Promise<any>;
/**
* Get the latest header announced in the network.
* @returns {any}
*/
  get_network_head_header(): any;
/**
* Get the latest locally synced header.
* @returns {Promise<any>}
*/
  get_local_head_header(): Promise<any>;
/**
* Get a synced header for the block with a given hash.
* @param {string} hash
* @returns {Promise<any>}
*/
  get_header_by_hash(hash: string): Promise<any>;
/**
* Get a synced header for the block with a given height.
* @param {bigint} height
* @returns {Promise<any>}
*/
  get_header_by_height(height: bigint): Promise<any>;
/**
* Get synced headers from the given heights range.
*
* If start of the range is undefined (None), the first returned header will be of height 1.
* If end of the range is undefined (None), the last returned header will be the last header in the
* store.
*
* # Errors
*
* If range contains a height of a header that is not found in the store.
* @param {bigint | undefined} [start_height]
* @param {bigint | undefined} [end_height]
* @returns {Promise<any>}
*/
  get_headers(start_height?: bigint, end_height?: bigint): Promise<any>;
/**
* Get data sampling metadata of an already sampled height.
* @param {bigint} height
* @returns {Promise<any>}
*/
  get_sampling_metadata(height: bigint): Promise<any>;
}
/**
* Config for the lumina wasm node.
*/
export class NodeConfig {
  free(): void;
/**
* Get the configuration with default bootnodes and genesis hash for provided network
* @param {Network} network
* @returns {NodeConfig}
*/
  static default(network: Network): NodeConfig;
/**
* A list of bootstrap peers to connect to.
*/
  bootnodes: (string)[];
/**
* Hash of the genesis block in the network.
*/
  genesis_hash?: string;
/**
* A network to connect to.
*/
  network: Network;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_networkinfo_free: (a: number) => void;
  readonly networkinfo_num_peers: (a: number) => number;
  readonly networkinfo_connection_counters: (a: number) => number;
  readonly __wbg_connectioncounters_free: (a: number) => void;
  readonly connectioncounters_num_connections: (a: number) => number;
  readonly connectioncounters_num_pending: (a: number) => number;
  readonly connectioncounters_num_pending_incoming: (a: number) => number;
  readonly connectioncounters_num_pending_outgoing: (a: number) => number;
  readonly connectioncounters_num_established_incoming: (a: number) => number;
  readonly connectioncounters_num_established_outgoing: (a: number) => number;
  readonly connectioncounters_num_established: (a: number) => number;
  readonly __wbg_node_free: (a: number) => void;
  readonly __wbg_nodeconfig_free: (a: number) => void;
  readonly __wbg_get_nodeconfig_network: (a: number) => number;
  readonly __wbg_set_nodeconfig_network: (a: number, b: number) => void;
  readonly __wbg_get_nodeconfig_genesis_hash: (a: number, b: number) => void;
  readonly __wbg_set_nodeconfig_genesis_hash: (a: number, b: number, c: number) => void;
  readonly __wbg_get_nodeconfig_bootnodes: (a: number, b: number) => void;
  readonly __wbg_set_nodeconfig_bootnodes: (a: number, b: number, c: number) => void;
  readonly node_new: (a: number) => number;
  readonly node_local_peer_id: (a: number, b: number) => void;
  readonly node_peer_tracker_info: (a: number, b: number) => void;
  readonly node_wait_connected: (a: number) => number;
  readonly node_wait_connected_trusted: (a: number) => number;
  readonly node_network_info: (a: number) => number;
  readonly node_listeners: (a: number) => number;
  readonly node_connected_peers: (a: number) => number;
  readonly node_set_peer_trust: (a: number, b: number, c: number, d: number) => number;
  readonly node_request_head_header: (a: number) => number;
  readonly node_request_header_by_hash: (a: number, b: number, c: number) => number;
  readonly node_request_header_by_height: (a: number, b: number) => number;
  readonly node_request_verified_headers: (a: number, b: number, c: number) => number;
  readonly node_syncer_info: (a: number) => number;
  readonly node_get_network_head_header: (a: number, b: number) => void;
  readonly node_get_local_head_header: (a: number) => number;
  readonly node_get_header_by_hash: (a: number, b: number, c: number) => number;
  readonly node_get_header_by_height: (a: number, b: number) => number;
  readonly node_get_headers: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly node_get_sampling_metadata: (a: number, b: number) => number;
  readonly nodeconfig_default: (a: number) => number;
  readonly setup_logging: () => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he72293ccf925f71b: (a: number, b: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4573c036346e1b0b: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hbe4057f3fd5bf63a: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h32ac46da532d9454: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6a431131dfcff4a0: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h0b8f5bba9ae8e519: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
