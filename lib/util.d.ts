import { cosmosclient, proto } from '@cosmos-client/core';
import { Address, Balance, Fees, Network, TxHash } from '@xchainjs/xchain-client';
import { CosmosSDKClient, TxLog } from '@xchainjs/xchain-cosmos';
import { Asset, BaseAmount } from '@xchainjs/xchain-util';
import { ChainId, ChainIds, ClientUrl, ExplorerUrls, TxData } from './types';
import { MsgNativeTx } from './types/messages';
export declare const DECIMAL = 8;
export declare const DEFAULT_GAS_VALUE = "4000000";
export declare const DEPOSIT_GAS_VALUE = "500000000";
export declare const MAX_TX_COUNT = 100;
/**
 * Checks whether an asset is `AssetRuneNative`
 *
 * @param {Asset} asset
 * @returns {boolean} `true` or `false`
 */
export declare const isAssetRuneNative: (asset: Asset) => boolean;
/**
 * Get denomination from Asset
 *
 * @param {Asset} asset
 * @returns {string} The denomination of the given asset.
 */
export declare const getDenom: (asset: Asset) => string;
/**
 * Get Asset from denomination
 *
 * @param {string} denom
 * @returns {Asset|null} The asset of the given denomination.
 */
export declare const assetFromDenom: (denom: string) => Asset | null;
/**
 * Response guard for transaction broadcast
 *
 * @param {any} response The response from the node.
 * @returns {boolean} `true` or `false`.
 */
export declare const isBroadcastSuccess: (response: unknown) => boolean;
/**
 * Get address prefix based on the network.
 *
 * @param {Network} network
 * @returns {string} The address prefix based on the network.
 *
 **/
export declare const getPrefix: (network: Network) => "thor" | "sthor" | "tthor";
/**
 * Register type for encoding `MsgDeposit` messages
 */
export declare const registerDepositCodecs: () => void;
/**
 * Register type for encoding `MsgSend` messages
 */
export declare const registerSendCodecs: () => void;
/**
 * Parse transaction data from event logs
 *
 * @param {TxLog[]} logs List of tx logs
 * @param {Address} address - Address to get transaction data for
 * @returns {TxData} Parsed transaction data
 */
export declare const getDepositTxDataFromLogs: (logs: TxLog[], address: Address) => TxData;
/**
 * Get the default fee.
 *
 * @returns {Fees} The default fee.
 */
export declare const getDefaultFees: () => Fees;
/**
 * Get transaction type.
 *
 * @param {string} txData the transaction input data
 * @param {string} encoding `base64` or `hex`
 * @returns {string} the transaction type.
 */
export declare const getTxType: (txData: string, encoding: 'base64' | 'hex') => string;
/**
 * Helper to get THORChain's chain id
 * @param {string} nodeUrl THORNode url
 */
export declare const getChainId: (nodeUrl: string) => Promise<ChainId>;
/**
 * Helper to get all THORChain's chain id
 * @param {ClientUrl} client urls (use `getDefaultClientUrl()` if you don't need to use custom urls)
 */
export declare const getChainIds: (client: ClientUrl) => Promise<ChainIds>;
/**
 * Builds final unsigned TX
 *
 * @param cosmosSdk - CosmosSDK
 * @param txBody - txBody with encoded Msgs
 * @param signerPubkey - signerPubkey string
 * @param sequence - account sequence
 * @param gasLimit - transaction gas limit
 * @returns
 */
export declare const buildUnsignedTx: ({ cosmosSdk, txBody, signerPubkey, sequence, gasLimit, }: {
    cosmosSdk: cosmosclient.CosmosSDK;
    txBody: proto.cosmos.tx.v1beta1.TxBody;
    signerPubkey: proto.google.protobuf.Any;
    sequence: cosmosclient.Long;
    gasLimit: string;
}) => cosmosclient.TxBuilder;
/**
 * Structure a MsgDeposit
 *
 * @param {MsgNativeTx} msgNativeTx Msg of type `MsgNativeTx`.
 * @param {string} nodeUrl Node url
 * @param {chainId} ChainId Chain id of the network
 *
 * @returns {Tx} The transaction details of the given transaction id.
 *
 * @throws {"Invalid client url"} Thrown if the client url is an invalid one.
 */
export declare const buildDepositTx: ({ msgNativeTx, nodeUrl, chainId, }: {
    msgNativeTx: MsgNativeTx;
    nodeUrl: string;
    chainId: ChainId;
}) => Promise<proto.cosmos.tx.v1beta1.TxBody>;
/**
 * Structure a MsgSend
 *
 * @param fromAddress - required, from address string
 * @param toAddress - required, to address string
 * @param assetAmount - required, asset amount string (e.g. "10000")
 * @param assetDenom - required, asset denom string (e.g. "rune")
 * @param memo - optional, memo string
 *
 * @returns
 */
export declare const buildTransferTx: ({ fromAddress, toAddress, assetAmount, assetDenom, memo, nodeUrl, chainId, }: {
    fromAddress: Address;
    toAddress: Address;
    assetAmount: BaseAmount;
    assetDenom: string;
    memo?: string | undefined;
    nodeUrl: string;
    chainId: ChainId;
}) => Promise<proto.cosmos.tx.v1beta1.TxBody>;
/**
 * Get the balance of a given address.
 *
 * @param {Address} address By default, it will return the balance of the current wallet. (optional)
 * @param {Asset} asset If not set, it will return all assets available. (optional)
 * @param {cosmosClient} CosmosSDKClient
 *
 * @returns {Balance[]} The balance of the address.
 */
export declare const getBalance: ({ address, assets, cosmosClient, }: {
    address: Address;
    assets?: Asset[] | undefined;
    cosmosClient: CosmosSDKClient;
}) => Promise<Balance[]>;
/**
 * Get the client url.
 *
 * @returns {ClientUrl} The client url (both mainnet and testnet) for thorchain.
 */
export declare const getDefaultClientUrl: () => ClientUrl;
/**
 * Get default explorer urls.
 *
 * @returns {ExplorerUrls} Default explorer urls (both mainnet and testnet) for thorchain.
 */
export declare const getDefaultExplorerUrls: () => ExplorerUrls;
/**
 * Get the explorer url.
 *
 * @param {Network} network
 * @param {ExplorerUrls} Explorer urls
 * @returns {string} The explorer url for thorchain based on the given network.
 */
export declare const getExplorerUrl: ({ root }: ExplorerUrls, network: Network) => string;
/**
 * Get explorer address url.
 *
 * @param {ExplorerUrls} Explorer urls
 * @param {Network} network
 * @param {Address} address
 * @returns {string} The explorer url for the given address.
 */
export declare const getExplorerAddressUrl: ({ urls, network, address, }: {
    urls: ExplorerUrls;
    network: Network;
    address: Address;
}) => string;
/**
 * Get transaction url.
 *
 * @param {ExplorerUrls} Explorer urls
 * @param {Network} network
 * @param {TxHash} txID
 * @returns {string} The explorer url for the given transaction id.
 */
export declare const getExplorerTxUrl: ({ urls, network, txID, }: {
    urls: ExplorerUrls;
    network: Network;
    txID: TxHash;
}) => string;
