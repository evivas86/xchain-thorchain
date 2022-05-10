import { Network, Tx, TxParams } from '@xchainjs/xchain-client';
import { Asset, BaseAmount } from '@xchainjs/xchain-util';
export declare type NodeUrl = {
    node: string;
    rpc: string;
};
export declare type ClientUrl = Record<Network, NodeUrl>;
export declare type ExplorerUrls = {
    root: ExplorerUrl;
    tx: ExplorerUrl;
    address: ExplorerUrl;
};
export declare type ExplorerUrl = Record<Network, string>;
export declare type ChainId = string;
export declare type ChainIds = Record<Network, ChainId>;
export declare type ThorchainClientParams = {
    clientUrl?: ClientUrl;
    explorerUrls?: ExplorerUrls;
    chainIds: ChainIds;
};
export declare type DepositParam = {
    walletIndex?: number;
    asset?: Asset;
    amount: BaseAmount;
    memo: string;
};
export declare type TxData = Pick<Tx, 'from' | 'to' | 'type'>;
export declare type TxOfflineParams = TxParams & {
    /**
     * Balance of Rune to send from
     */
    from_rune_balance: BaseAmount;
    /**
     * Balance of asset to send from
     * Optional: It can be ignored if asset to send from is RUNE
     */
    from_asset_balance?: BaseAmount;
    from_account_number: string;
    from_sequence: string;
};
/**
 * Response from `thorchain/constants` endpoint
 */
export declare type ThorchainConstantsResponse = {
    int_64_values: {
        NativeTransactionFee: number;
    };
};
/**
 * Response of `/cosmos/base/tendermint/v1beta1/node_info`
 * Note: We are interested in `network` (aka chain id) only
 */
export declare type NodeInfoResponse = {
    default_node_info: {
        network: string;
    };
};
