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
    // TODO: Mission 4: create NFT using sdk
    // https://sdk.mint.club/docs/sdk/network/nft/create
    // NFT 생성하기
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
    // TODO: Mission 5: check if NFT exists using sdk
    // https://sdk.mint.club/docs/sdk/network/nft/exists
    // 이미 같은 심볼로 발행된 NFT 는 발행 불가능. 유저이름으로 사용.
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
