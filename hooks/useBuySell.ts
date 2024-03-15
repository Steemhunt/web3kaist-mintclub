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

      setEstimation(toNumber(estimation, 18) * 1000);
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
      // TODO: Mission 8: buy NFT using sdk
      // https://sdk.mint.club/docs/sdk/network/nft/buy

      // ...
    } finally {
      setLoading(false);
    }
  }

  async function sell(onSuccess: () => void) {
    try {
      setLoading(true);
      // TODO: Mission 9: sell NFT using sdk
      // https://sdk.mint.club/docs/sdk/network/nft/sell

      // ...
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
