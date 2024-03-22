import { mintclub, toNumber } from 'mint.club-v2-sdk';
import { useEffect, useState } from 'react';

export type NftDetail = {
  name: string;
  image: string;
  price: number;
  sold: number;
  maxSupply: number;
  address: `0x${string}`;
};

export default function useNft(address?: `0x${string}` | null) {
  const [data, setData] = useState<NftDetail | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      if (!address) {
        setData(null);
        return;
      }

      setLoading(true);
      // TODO: Mission 6: fetch NFT detail using sdk
      // https://sdk.mint.club/docs/sdk/network/nft/getDetail
      const nft = mintclub.network('base').nft(address);
      const {
        info: { name, token, priceForNextMint, currentSupply, maxSupply },
      } = await nft.getDetail();

      const imageHash = await nft.getImageUri().catch(() => '');
      const imageUrl = mintclub.ipfs.hashToGatewayUrl(imageHash);

      setData({
        name,
        maxSupply: Number(maxSupply),
        image: imageUrl,
        price: toNumber(priceForNextMint, 18),
        sold: Number(currentSupply),
        address: token,
      });
      setLoading(false);
    } catch (e) {
      console.error(e);
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return { data, refresh: fetchData, loading };
}
