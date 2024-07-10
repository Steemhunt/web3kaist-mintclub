import { CHUNWON_TOKEN_ADDRESS } from '@/constants';
import { useGlobalStore } from '@/stores/global';
import { mintclub } from 'mint.club-v2-sdk';
import { useEffect } from 'react';

export default function useNftList() {
  const list = useGlobalStore((state) => state.list);
  async function fetchList() {
    try {
      useGlobalStore.setState({ list: [] });

      const list = await mintclub.network('base').bond.getTokensByReserveToken({
        reserveToken: CHUNWON_TOKEN_ADDRESS,
        start: 17000,
        end: 20000,
      });

      useGlobalStore.setState({ list });
    } catch (e) {
      console.error(e);
      fetchList();
    }
  }

  useEffect(() => {
    fetchList();

    // eslint-disable-next-line
  }, []);

  return { list, refresh: fetchList };
}
