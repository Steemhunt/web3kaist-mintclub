'use client';
import { mintclub } from 'mint.club-v2-sdk';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function useWallet() {
  const [account, setAccount] = useState<`0x${string}` | null>(null);
  const [isUserLoading, setLoading] = useState(true);

  async function connect() {
    try {
      setLoading(true);
      // TODO: connect wallet using sdk
      const address = await mintclub.wallet.connect();
      toast.success('지갑 연결 성공!');
      setAccount(address);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function checkConnection() {
      setLoading(true);
      // TODO: check if user is already connected
      const alreadyConnected = await mintclub.wallet.account();
      setAccount(alreadyConnected);
      setLoading(false);
    }

    checkConnection();
  }, []);

  return { isUserLoading, account, connect };
}
