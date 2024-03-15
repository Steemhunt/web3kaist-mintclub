'use client';

import Button from '@/components/Button';
import { CHUNWON_TOKEN_ADDRESS } from '@/constants';
import useERC20Balance from '@/hooks/useERC20Balance';
import useProfile from '@/hooks/useProfile';
import useWallet from '@/hooks/useWallet';
import { useGlobalStore } from '@/stores/global';
import { bebas } from '@/styles/fonts';
import { cn } from '@/utils/classnames';
import { abbreviateAddress } from '@/utils/strings';
import { commify, shortenNumber } from 'mint.club-v2-sdk';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const myPrice = useGlobalStore((state) => state.myPrice);
  useProfile();

  return (
    <div className="flex w-screen flex-col justify-between gap-5 pt-5  text-sm padded-horizontal mobile:flex-row">
      <div className="flex items-center justify-between gap-5 mobile:justify-start">
        <div className="flex items-center gap-5">
          <Link href="/">
            <div
              className="flex h-8 w-8 items-center justify-center bg-primary text-xl leading-none text-white"
              style={bebas.style}
            >
              K
            </div>
          </Link>
          {myPrice === undefined && (
            <div className="hidden w-fit items-center gap-2 mobile:flex">
              <Link href="/create" className="font-bold text-white">
                <Button className="border-2 border-white/80 bg-transparent text-white/80">
                  계정생성
                </Button>
              </Link>
            </div>
          )}
        </div>

        {myPrice !== undefined && (
          <div className="flex items-center gap-2">
            <div className="text-end text-xs font-bold text-white">
              내 친구권 현재 가격{' '}
              <span className="text-green-500">
                {commify(shortenNumber(myPrice * 1000))} KRW
              </span>
            </div>
          </div>
        )}
        <Image
          className="mobile:hidden"
          src="/menu.svg"
          width={20}
          height={20}
          alt="menu"
          onClick={() => useGlobalStore.setState({ collapsed: false })}
        />
      </div>

      <HeaderButtons />
    </div>
  );
}

function HeaderButtons() {
  const myPrice = useGlobalStore((state) => state.myPrice);
  const collapsed = useGlobalStore((state) => state.collapsed);
  const setCollapsed = (collapsed: boolean) =>
    useGlobalStore.setState({ collapsed });
  const { account, connect, disconnect, change } = useWallet();
  const { balance } = useERC20Balance(CHUNWON_TOKEN_ADDRESS);
  return (
    <>
      {!collapsed && (
        <>
          <div className="fixed left-0 top-0 z-20 h-[100lvh] w-screen bg-black/90 mobile:hidden" />
          <div className="fixed bottom-10 left-1/2 z-40 -translate-x-1/2 mobile:hidden">
            <Button className="bg-red-500" onClick={() => setCollapsed(true)}>
              X
            </Button>
          </div>
        </>
      )}

      <div
        className={cn(
          'absolute bottom-20 left-0 z-[30] flex grid w-screen flex-col items-center gap-3 p-5 text-sm mobile:relative mobile:bottom-0 mobile:flex mobile:flex mobile:w-auto mobile:flex-row mobile:gap-2',
          collapsed ? 'hidden' : 'mobile:flex',
        )}
      >
        {myPrice === undefined && (
          <Link
            href="/create"
            className="flex w-full font-bold text-white mobile:hidden"
            onClick={() => {
              setCollapsed(true);
            }}
          >
            <Button className="w-full bg-green-500 text-black">계정생성</Button>
          </Link>
        )}
        {account ? (
          <>
            <Button className="border-2 bg-transparent text-white">
              <span className="text-gray-500">
                {abbreviateAddress(account)}
              </span>
              <span className="font-bold">
                ({commify(shortenNumber(balance * 1000))} KRW 보유중)
              </span>
            </Button>
            <Button
              onClick={() => {
                change();
              }}
            >
              지갑변경
            </Button>
            <Button
              className="bg-transparent text-gray-500"
              onClick={() => {
                disconnect();
                setCollapsed(true);
              }}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button onClick={connect}>로그인</Button>
          </>
        )}
      </div>
    </>
  );
}
