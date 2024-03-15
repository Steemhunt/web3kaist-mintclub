'use client';

import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Logo from '@/components/Logo';
import useCreate from '@/hooks/useCreate';
import useProfile from '@/hooks/useProfile';
import useWallet from '@/hooks/useWallet';
import { uploadImage, uploadMetadata } from '@/server/ipfs';
import { useGlobalStore } from '@/stores/global';
import { abbreviateAddress } from '@/utils/strings';
import { useDebounce } from '@uidotdev/usehooks';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function CreatePage() {
  const router = useRouter();
  const { account, isUserLoading, change } = useWallet();
  const uploadRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState('');
  const [file, setFile] = useState<Blob | null>(null);
  const [imgUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const debouncedUsername = useDebounce(username, 150);
  const usernameLoading = debouncedUsername !== username;
  const myPrice = useGlobalStore((state) => state.myPrice);
  const { createProfile, checkingUsername, exists } =
    useCreate(debouncedUsername);
  const { checkingProfile } = useProfile();

  if (!account) {
    redirect('/login');
  }

  if (isUserLoading || checkingProfile) {
    return (
      <div className="flex h-full w-full justify-center text-2xl">
        <Loading />
      </div>
    );
  }

  if (myPrice) {
    toast.error('이미 프로필이 존재합니다', {
      id: 'profile-exists',
    });

    redirect('/');
  }

  return (
    <div className="flex h-full w-full items-start justify-center padded-horizontal">
      <input
        ref={uploadRef}
        className="hidden"
        type="file"
        accept="image/*"
        max={1}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setImageUrl(URL.createObjectURL(file));
            setFile(file);
          } else {
            setImageUrl(null);
            setFile(null);
          }
          e.currentTarget.value = '';
        }}
      />
      <div className="flex w-[300px] flex-col items-center justify-center border border-white/20 bg-black/80 p-10">
        <Logo />

        <div className="my-10 flex flex-col items-center justify-center">
          <div className="text-sm font-bold text-white">프로필 사진 추가</div>
          {imgUrl ? (
            <Image
              src={imgUrl}
              width={100}
              height={100}
              className="mt-4 flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center rounded-full"
              alt="pic"
              onClick={() => {
                uploadRef.current?.click();
              }}
            />
          ) : (
            <div
              className="mt-4 flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center rounded-full border-2 border-gray-500 text-4xl font-bold text-gray-500"
              onClick={() => {
                uploadRef.current?.click();
              }}
            >
              +
            </div>
          )}

          <div className="mt-10 text-sm font-bold text-white">유저이름</div>
          <input
            className="border-b border-white bg-transparent p-2 text-center text-white outline-none"
            placeholder="e.g. cool_ggoma"
            value={username}
            maxLength={15}
            onChange={(e) => {
              let value = e.target.value;
              // Replace all non-alphanumeric characters except for dots, dashes, and underscores
              value = value.replace(/[^a-zA-Z0-9.-_]/g, '');
              // Prevent two or more dots, dashes, or underscores in a row
              value = value.replace(/(\.){2,}/g, '.').replace(/(_){2,}/g, '_');

              setUsername(value);
            }}
          />
          {!usernameLoading && username && !checkingUsername && (
            <div className="mt-2 text-xs">
              {exists ? (
                <div className="text-red-500">이미 존재하는 유저이름입니다</div>
              ) : (
                <div className="text-green-500">사용 가능한 유저이름입니다</div>
              )}
            </div>
          )}
          {(checkingUsername || checkingUsername || usernameLoading) && (
            <div className="mt-2 text-xs text-gray-500">체크중...</div>
          )}
        </div>

        <Button
          className="mt-10 w-full bg-primary text-black"
          disabled={checkingUsername || exists || usernameLoading || !username}
          loading={loading}
          onClick={async () => {
            if (!file || !imgUrl) {
              toast.error('프로필 사진을 추가해주세요');
              return;
            }
            try {
              setLoading(true);

              const imageForm = new FormData();
              imageForm.append('file', file);
              toast('🖼️ 이미지 업로드 중');
              const imageUrl = await uploadImage(imageForm);
              toast.success('🖼️ 이미지 업로드 완료!');

              const metadataForm = new FormData();
              metadataForm.append('image', imageUrl);
              metadataForm.append('name', username);
              toast('📁 메타데이터 업로드 중..');
              const metadataUrl = await uploadMetadata(metadataForm);
              toast.success('📁 메타데이터 업로드 완료!');

              await createProfile(
                metadataUrl,
                () => {
                  router.replace('/');
                },
                (err: any) => {
                  toast.error(err?.message);
                  setLoading(false);
                },
              );
            } catch (e: any) {
              console.error(e);
              toast.error(e);
              setLoading(false);
            }
          }}
        >
          계정 생성하기
        </Button>

        <div className="mt-5 font-bold text-primary">
          {abbreviateAddress(account || '')}
        </div>

        <div
          className="mt-5 cursor-pointer text-sm font-bold text-gray-500"
          onClick={async () => {
            await change();
          }}
        >
          다른 지갑 연결하기
        </div>
      </div>
    </div>
  );
}
