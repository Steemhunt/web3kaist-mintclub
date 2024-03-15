'use client';
import Loading from '@/components/Loading';
import Logo from '@/components/Logo';
import TokenItem from '@/components/TokenItem';
import useNftList from '@/hooks/useNftList';
import { commify } from 'mint.club-v2-sdk';

export default function Home() {
  const { list, refresh } = useNftList();
  return (
    <div className="flex h-full w-full flex-col items-center padded-horizontal-narrow">
      <Logo className="hidden text-5xl mobile:block" />

      {list.length === 0 && <Loading className="mt-5" />}

      {list.length > 0 && (
        <div className="flex w-full items-center justify-between gap-2 mobile:flex-col mobile:justify-center">
          <div className="text-xs text-gray-500">
            총 {commify(list.length)}개의 계정
          </div>
          <div
            className="cursor-pointer bg-transparent text-xs text-white/80"
            onClick={refresh}
          >
            새로고침 🔃
          </div>
        </div>
      )}

      <div className="mt-5 grid w-full grid-cols-1 items-start justify-between gap-2 mobile:mt-10 mobile:grid-cols-3">
        {list.map((address) => {
          return <TokenItem key={address} tokenAddress={address} />;
        })}
      </div>
    </div>
  );
}
