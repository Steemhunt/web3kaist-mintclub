import useWallet from '@/hooks/useWallet';
import { mintclub } from 'mint.club-v2-sdk';
import { useEffect, useState } from 'react';

export default function useNftBalance(tokenAddress: `0x${string}`) {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { account } = useWallet();

  async function getBalance() {
    if (tokenAddress && account) {
      setLoading(true);
      try {
        const balance = await mintclub
          .network('base')
          .nft(tokenAddress)
          .getBalanceOf(account);

        setBalance(Number(balance));
        setLoading(false);
      } catch (e) {
        console.error(e);
        getBalance();
      }
    }
  }

  useEffect(() => {
    getBalance();
    // eslint-disable-next-line
  }, [tokenAddress, account]);

  return { balance, loadingBalance: loading, refresh: getBalance };
}
