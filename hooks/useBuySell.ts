import { useDebounce } from '@uidotdev/usehooks';
import { mintclub, toNumber, wei } from 'mint.club-v2-sdk';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function useBuySell(
  tradeType: 'buy' | 'sell' | null,
  tokenAddress: `0x${string}`,
  amount: number,
) {
  const [loading, setLoading] = useState(false);
  const [estimating, setEstimating] = useState(false);
  const [estimation, setEstimation] = useState(0);
  const debounced = useDebounce(amount, 500);

  async function estimate() {
    try {
      setEstimating(true);
      const nft = mintclub.network('base').nft(tokenAddress);

      let estimation: bigint;

      if (tradeType === 'buy') {
        [estimation] = await nft.getBuyEstimation(BigInt(amount));
      } else {
        [estimation] = await nft.getSellEstimation(BigInt(amount));
      }

      setEstimation(toNumber(estimation, 18));
    } finally {
      setEstimating(false);
    }
  }

  useEffect(() => {
    if (tradeType === null) {
      setEstimation(0);
      setEstimating(false);
      setLoading(false);
    }

    if (
      tradeType !== null &&
      tokenAddress &&
      amount !== 0 &&
      amount !== undefined &&
      debounced === amount
    ) {
      estimate();
    }
    // eslint-disable-next-line
  }, [amount, debounced, tradeType, tokenAddress]);

  async function buy(onSuccess: () => void) {
    try {
      setLoading(true);
      // TODO: Mission 7: buy NFT using sdk
      // https://sdk.mint.club/docs/sdk/network/nft/buy
      await mintclub
        .network('base')
        .nft(tokenAddress)
        .buy({
          amount: BigInt(amount),
          onAllowanceSignatureRequest: () => {
            toast('🔓 컨트랙트의 토큰사용을 허용해주세요');
          },
          onAllowanceSuccess: () => {
            toast.success('허용되었습니다');
          },
          onSignatureRequest: () => {
            toast('🖊️ 트랜잭션을 승인해주세요');
          },
          onSigned: () => {
            toast.success('🚀 트랜잭션이 성공적으로 전송되었습니다');
          },
          debug: (e) => {
            console.log(e);
          },
          onSuccess,
          onError: (e: any) => {
            console.error(e);
            toast.error('구매에 실패했습니다. 콘솔을 확인해주세요');
          },
        });
    } finally {
      setLoading(false);
    }
  }

  async function sell(onSuccess: () => void) {
    try {
      setLoading(true);
      // TODO: Mission 8: sell NFT using sdk
      // https://sdk.mint.club/docs/sdk/network/nft/sell

      await mintclub
        .network('base')
        .nft(tokenAddress)
        .sell({
          amount: BigInt(amount),
          onAllowanceSignatureRequest: () => {
            toast('🔓 컨트랙트의 토큰사용을 허용해주세요');
          },
          onAllowanceSuccess: () => {
            toast.success('허용되었습니다');
          },
          onSignatureRequest: () => {
            toast('🖊️ 트랜잭션을 승인해주세요');
          },
          onSigned: () => {
            toast.success('🚀 트랜잭션이 성공적으로 전송되었습니다');
          },
          debug: (e) => {
            console.log(e);
          },
          onSuccess,
          onError: (e: any) => {
            console.error(e);
            toast.error('구매에 실패했습니다. 콘솔을 확인해주세요');
          },
        });
    } finally {
      setLoading(false);
    }
  }

  return {
    buy,
    sell,
    estimation,
    estimating: estimating || debounced !== amount,
    txLoading: loading,
  };
}
