'use client';

import Button from '@/components/Button';
import useWallet from '@/hooks/useWallet';
import { handwriting } from '@/styles/fonts';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const { account, isUserLoading, connect } = useWallet();

  if (isUserLoading) {
    return (
      <div
        className="flex h-full w-full items-center justify-center text-2xl"
        style={handwriting.style}
      >
        Loading user...
      </div>
    );
  }

  if (account) {
    redirect('/create');
  }

  return (
    <div className="flex h-full w-full items-center justify-center padded-horizontal">
      <div className="flex w-[300px] flex-col items-center justify-center border border-white/20 bg-black/80 p-10">
        <div className="text-5xl text-primary" style={handwriting.style}>
          Kainstagram
        </div>

        <div className="my-10 text-center">
          메타마스크로 회원가입 또는 로그인하세요
        </div>

        <Button
          className="mt-10 w-full border-2 border-metamask text-white"
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
