'use client';
import { useGlobalStore } from '@/stores/global';
import { mintclub } from 'mint.club-v2-sdk';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function useWallet() {
  const account = useGlobalStore((state) => state.account);
  const userLoading = useGlobalStore((state) => state.userLoading);

  async function syncAccount() {
    useGlobalStore.setState({ userLoading: true });
    // TODO: check if user is already connected
    const currentAddress = await mintclub.wallet.account();
    useGlobalStore.setState({ account: currentAddress });
    useGlobalStore.setState({ userLoading: false });
  }

  async function connect() {
    try {
      useGlobalStore.setState({ userLoading: true });
      // TODO: connect wallet using sdk
      await mintclub.wallet.connect();
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message);
    } finally {
      syncAccount();
    }
  }

  useEffect(() => {
    syncAccount();
  }, []);

  async function disconnect() {
    // TODO: disconnect wallet using sdk
    await mintclub.wallet.disconnect();
    await syncAccount();
  }

  async function change() {
    // TODO: change wallet using sdk
    await mintclub.wallet.change();
    await syncAccount();
  }

  return {
    isUserLoading: !account && userLoading,
    account,
    connect,
    disconnect,
    change,
  };
}
