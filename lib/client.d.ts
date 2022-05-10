import { cosmosclient, proto } from '@cosmos-client/core';
import { Address, Balance, BaseXChainClient, Fees, Network, Tx, TxHash, TxHistoryParams, TxParams, TxsPage, XChainClient, XChainClientParams } from '@xchainjs/xchain-client';
import { CosmosSDKClient, RPCTxResult } from '@xchainjs/xchain-cosmos';
import { Asset } from '@xchainjs/xchain-util';
import { ChainId, ClientUrl, DepositParam, ExplorerUrls, NodeUrl, ThorchainClientParams, TxOfflineParams } from './types';
/**
 * Interface for custom Thorchain client
 */
export interface ThorchainClient {
    setClientUrl(clientUrl: ClientUrl): void;
    getClientUrl(): NodeUrl;
    setExplorerUrls(explorerUrls: ExplorerUrls): void;
    getCosmosClient(): CosmosSDKClient;
    deposit(params: DepositParam): Promise<TxHash>;
}
/**
 * Custom Thorchain Client
 */
declare class Client extends BaseXChainClient implements ThorchainClient, XChainClient {
    private clientUrl;
    private explorerUrls;
    private chainIds;
    private cosmosClient;
    /**
     * Constructor
     *
     * Client has to be initialised with network type and phrase.
     * It will throw an error if an invalid phrase has been passed.
     *
     * @param {XChainClientParams} params
     *
     * @throws {"Invalid phrase"} Thrown if the given phase is invalid.
     */
    constructor({ network, phrase, clientUrl, explorerUrls, rootDerivationPaths, chainIds, }: XChainClientParams & ThorchainClientParams);
    /**
     * Set/update the current network.
     *
     * @param {Network} network
     * @returns {void}
     *
     * @throws {"Network must be provided"}
     * Thrown if network has not been set before.
     */
    setNetwork(network: Network): void;
    /**
     * Set/update the client URL.
     *
     * @param {ClientUrl} clientUrl The client url to be set.
     * @returns {void}
     */
    setClientUrl(clientUrl: ClientUrl): void;
    /**
     * Get the client url.
     *
     * @returns {NodeUrl} The client url for thorchain based on the current network.
     */
    getClientUrl(): NodeUrl;
    /**
     * Set/update the explorer URLs.
     *
     * @param {ExplorerUrls} urls The explorer urls to be set.
     * @returns {void}
     */
    setExplorerUrls(urls: ExplorerUrls): void;
    /**
     * Get the explorer url.
     *
     * @returns {string} The explorer url for thorchain based on the current network.
     */
    getExplorerUrl(): string;
    /**
     * Sets chain id
     *
     * @param {ChainId} chainId Chain id to update
     * @param {Network} network (optional) Network for given chainId. If `network`not set, current network of the client is used
     *
     * @returns {void}
     */
    setChainId(chainId: ChainId, network?: Network): void;
    /**
     * Gets chain id
     *
     * @param {Network} network (optional) Network to get chain id from. If `network`not set, current network of the client is used
     *
     * @returns {ChainId} Chain id based on the current network.
     */
    getChainId(network?: Network): ChainId;
    /**
     * Get cosmos client
     * @returns {CosmosSDKClient} current cosmos client
     */
    getCosmosClient(): CosmosSDKClient;
    /**
     * Get the explorer url for the given address.
     *
     * @param {Address} address
     * @returns {string} The explorer url for the given address.
     */
    getExplorerAddressUrl(address: Address): string;
    /**
     * Get the explorer url for the given transaction id.
     *
     * @param {string} txID
     * @returns {string} The explorer url for the given transaction id.
     */
    getExplorerTxUrl(txID: string): string;
    /**
     * Get private key
     *
     * @param {number} index the HD wallet index (optional)
     * @returns {PrivKey} The private key generated from the given phrase
     *
     * @throws {"Phrase not set"}
     * Throws an error if phrase has not been set before
     * */
    getPrivateKey(index?: number): proto.cosmos.crypto.secp256k1.PrivKey;
    /**
     * Get public key
     *
     * @param {number} index the HD wallet index (optional)
     *
     * @returns {PubKey} The public key generated from the given phrase
     *
     * @throws {"Phrase not set"}
     * Throws an error if phrase has not been set before
     **/
    getPubKey(index?: number): cosmosclient.PubKey;
    /**
     * Get the current address.
     *
     * @returns {Address} The current address.
     *
     * @throws {Error} Thrown if phrase has not been set before. A phrase is needed to create a wallet and to derive an address from it.
     */
    getAddress(index?: number): string;
    /**
     * Validate the given address.
     *
     * @param {Address} address
     * @returns {boolean} `true` or `false`
     */
    validateAddress(address: Address): boolean;
    /**
     * Get the balance of a given address.
     *
     * @param {Address} address By default, it will return the balance of the current wallet. (optional)
     * @param {Asset} asset If not set, it will return all assets available. (optional)
     * @returns {Balance[]} The balance of the address.
     */
    getBalance(address: Address, assets?: Asset[]): Promise<Balance[]>;
    /**
     * Get transaction history of a given address with pagination options.
     * By default it will return the transaction history of the current wallet.
     *
     * @param {TxHistoryParams} params The options to get transaction history. (optional)
     * @returns {TxsPage} The transaction history.
     */
    getTransactions: (params?: (TxHistoryParams & {
        filterFn?: ((tx: RPCTxResult) => boolean) | undefined;
    }) | undefined) => Promise<TxsPage>;
    /**
     * Get the transaction details of a given transaction id.
     *
     * @param {string} txId The transaction id.
     * @returns {Tx} The transaction details of the given transaction id.
     */
    getTransactionData(txId: string, address: Address): Promise<Tx>;
    /**
     * Get the transaction details of a given transaction id. (from /thorchain/txs/hash)
     *
     * Node: /thorchain/txs/hash response doesn't have timestamp field.
     *
     * @param {string} txId The transaction id.
     * @returns {Tx} The transaction details of the given transaction id.
     */
    getDepositTransaction(txId: string): Promise<Omit<Tx, 'date'>>;
    /**
     * Transaction with MsgNativeTx.
     *
     * @param {DepositParam} params The transaction options.
     * @returns {TxHash} The transaction hash.
     *
     * @throws {"insufficient funds"} Thrown if the wallet has insufficient funds.
     * @throws {"failed to broadcast transaction"} Thrown if failed to broadcast transaction.
     */
    deposit({ walletIndex, asset, amount, memo }: DepositParam): Promise<TxHash>;
    /**
     * Transfer balances with MsgSend
     *
     * @param {TxParams} params The transfer options.
     * @returns {TxHash} The transaction hash.
     */
    transfer({ walletIndex, asset, amount, recipient, memo }: TxParams): Promise<TxHash>;
    /**
     * Transfer without broadcast balances with MsgSend
     *
     * @param {TxOfflineParams} params The transfer offline options.
     * @returns {string} The signed transaction bytes.
     */
    transferOffline({ walletIndex, asset, amount, recipient, memo, from_rune_balance, from_asset_balance, from_account_number, from_sequence, }: TxOfflineParams): Promise<string>;
    /**
     * Gets fees from Node
     *
     * @returns {Fees}
     */
    getFees(): Promise<Fees>;
}
export { Client };
