import { CHUNWON_TOKEN_ADDRESS } from '@/constants';
import { useGlobalStore } from '@/stores/global';
import { mintclub } from 'mint.club-v2-sdk';
import { useEffect } from 'react';

export default function useNftList() {
  const list = useGlobalStore((state) => state.list);
  async function fetchList() {
    try {
      // TODO: fetch list of tokens using sdk
      useGlobalStore.setState({ list: [] });
      const list = await mintclub
        .network('base')
        .bond.getTokensByReserveToken(CHUNWON_TOKEN_ADDRESS);

      useGlobalStore.setState({ list });
    } catch (e) {
      console.error(e);
      fetchList();
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return { list, refresh: fetchList };
}
