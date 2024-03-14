'use client';

import { mintclub } from 'mint.club-v2-sdk';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function useCreate(symbol: string) {
  const [checking, setChecking] = useState(false);
  const [exists, setExists] = useState(false);

  async function createProfile(
    metadataUrl: `ipfs://${string}`,
    onSuccess: () => void,
  ) {
    // TODO: create NFT using sdk
    await mintclub
      .network('base')
      .nft(symbol)
      .create({
        name: symbol,
        reserveToken: {
          address: '0x883220A28533928eff6159666d7B1a5Fd5C30536', // 1,000 KRW
          decimals: 18,
        },
        curveData: {
          curveType: 'EXPONENTIAL',
          stepCount: 10, // how granular the curve is
          maxSupply: 10_000, // NFT max supply
          initialMintingPrice: 0.01, // starting price, 0.01 WETH
          finalMintingPrice: 0.1, // ending price, 0.1 WETH
          creatorAllocation: 100, // initial supply to the deployer
        },
        metadataUrl,
        onSuccess,
        onError: (error: any) => {
          toast.error(error?.message);
          console.error('Error creating NFT', error);
        },
      });
  }

  async function checkExisting(symbol: string) {
    setChecking(true);
    // TODO: check if NFT exists using sdk
    const exists = await mintclub.network('base').nft(symbol).exists();
    setChecking(false);
    return exists;
  }

  useEffect(() => {
    if (symbol) {
      checkExisting(symbol).then(setExists);
    } else {
      setChecking(false);
      setExists(false);
    }
  }, [symbol]);

  return { createProfile, exists, checking };
}
