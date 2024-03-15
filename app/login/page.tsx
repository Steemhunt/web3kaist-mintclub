'use client';

import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Logo from '@/components/Logo';
import useWallet from '@/hooks/useWallet';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const { account, isUserLoading, connect } = useWallet();

  if (account) {
    redirect('/create');
  }

  if (isUserLoading) {
    return (
      <div className="flex  h-full w-full justify-center text-2xl">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-start justify-center padded-horizontal">
      <div className="flex w-[300px] flex-col items-center justify-center border border-white/20 bg-black/80 p-10">
        <Logo />

        <div className="my-10 text-center">
          메타마스크로 회원가입 또는 로그인하세요
        </div>

        <Button
          className="mt-10 w-full"
          onClick={async () => {
            await connect();
          }}
        >
          <Image
            className="mr-1"
            src="/assets/metamask.svg"
            width={16}
            height={16}
            alt="metamask"
          />
          Connect Wallet
        </Button>
      </div>
    </div>
  );
}
