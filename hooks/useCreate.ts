'use client';

import { CHUNWON_TOKEN_ADDRESS } from '@/constants';
import { mintclub } from 'mint.club-v2-sdk';
import { useEffect, useState } from 'react';

export default function useCreate(symbol: string) {
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [exists, setExists] = useState(false);

  async function createProfile(
    metadataUrl: `ipfs://${string}`,
    onSuccess: () => void,
    onError: (err: any) => void,
  ) {
    // TODO: create NFT using sdk
    await mintclub
      .network('base')
      .nft(symbol)
      .create({
        name: symbol,
        reserveToken: {
          address: CHUNWON_TOKEN_ADDRESS, // 1,000 KRW
          decimals: 18,
        },
        curveData: {
          curveType: 'EXPONENTIAL',
          stepCount: 10, // how granular the curve is
          maxSupply: 10_000, // NFT max supply
          initialMintingPrice: 1, // starting price, 천원
          finalMintingPrice: 100_000, // ending price, 일억
          creatorAllocation: 1, // initial supply to the deployer = 1 = self follow
        },
        metadataUrl,
        onSuccess,
        onError,
      });
  }

  async function checkExisting(symbol: string) {
    setCheckingUsername(true);
    // TODO: check if NFT exists using sdk
    const exists = await mintclub.network('base').nft(symbol).exists();
    setCheckingUsername(false);
    return exists;
  }

  useEffect(() => {
    if (symbol) {
      checkExisting(symbol).then(setExists);
    } else {
      setCheckingUsername(false);
      setExists(false);
    }
  }, [symbol]);

  return {
    createProfile,
    exists,
    checkingUsername,
  };
}
