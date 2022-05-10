import { cosmosclient, proto } from '@cosmos-client/core';
import { Asset } from '@xchainjs/xchain-util';
export declare type MsgCoin = {
    asset: Asset;
    amount: string;
};
export declare class MsgNativeTx {
    coins: MsgCoin[];
    memo: string;
    signer: cosmosclient.AccAddress;
    constructor(coins: MsgCoin[], memo: string, signer: cosmosclient.AccAddress);
}
/**
 * This creates MsgNativeTx from json.
 *
 * @param value
 * @returns {MsgNativeTx}
 */
export declare const msgNativeTxFromJson: (value: {
    coins: MsgCoin[];
    memo: string;
    signer: string;
}) => MsgNativeTx;
export declare type AminoWrapping<T> = {
    type: string;
    value: T;
};
export declare type ThorchainDepositResponse = AminoWrapping<{
    msg: AminoWrapping<{
        coins: MsgCoin[];
        memo: string;
        signer: string;
    }>[];
    fee: proto.cosmos.tx.v1beta1.Fee;
    signatures: string[];
    memo: string;
    timeout_height: string;
}>;
export declare type TxResult = {
    observed_tx: {
        tx: {
            id: string;
            chain: string;
            from_address: string;
            to_address: string;
            coins: {
                asset: string;
                amount: string;
            }[];
            gas: {
                asset: string;
                amount: string;
            }[];
            memo: string;
        };
        status: string;
        signers: string[];
    };
    keysign_metric: {
        tx_id: string;
        node_tss_times: null;
    };
};
