'use client';

import Button from '@/components/Button';
import useCreate from '@/hooks/useCreate';
import useWallet from '@/hooks/useWallet';
import { uploadImage, uploadMetadata } from '@/server/ipfs';
import { handwriting } from '@/styles/fonts';
import { useDebounce } from '@uidotdev/usehooks';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function CreatePage() {
  const { account, isUserLoading, connect } = useWallet();
  const uploadRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState('');
  const [file, setFile] = useState<Blob | null>(null);
  const [imgUrl, setImageUrl] = useState<string | null>(null);
  const debouncedUsername = useDebounce(username, 150);
  const loading = debouncedUsername !== username;
  const { createProfile, checking, exists } = useCreate(debouncedUsername);

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

  if (!account) {
    redirect('/login');
  }

  return (
    <div className="flex h-full w-full items-center justify-center padded-horizontal">
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
        <div className="text-5xl text-primary" style={handwriting.style}>
          Kainstagram
        </div>

        <div className="my-10 flex flex-col items-center justify-center">
          <div className="text-sm font-bold text-white">프로필 사진 추가</div>
          {imgUrl ? (
            <Image
              src={imgUrl}
              width={100}
              height={100}
              className="mt-4 flex h-[100px] w-[100px] cursor-pointer flex-col items-center justify-center rounded-full"
              alt="pic"
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
            placeholder="e.g. ggoma.is.cool"
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
          {!loading && username && !checking && (
            <div className="mt-2 text-xs">
              {exists ? (
                <div className="text-red-500">이미 존재하는 유저이름입니다</div>
              ) : (
                <div className="text-green-500">사용 가능한 유저이름입니다</div>
              )}
            </div>
          )}
          {(checking || checking || loading) && (
            <div className="mt-2 text-xs text-gray-500">체크중...</div>
          )}
        </div>

        <Button
          className="mt-10 w-full bg-primary text-black"
          disabled={checking || exists || loading || !username}
          onClick={async () => {
            if (!file) {
              toast.error('프로필 사진을 추가해주세요');
              return;
            }
            try {
              const imageForm = new FormData();
              imageForm.append('file', file);
              const imageUrl = await uploadImage(imageForm);
              console.log({ imageUrl });
              const metadataForm = new FormData();
              metadataForm.append('image', imageUrl);
              metadataForm.append('name', username);
              const metadataUrl = await uploadMetadata(metadataForm);
              console.log({ metadataUrl });
              await createProfile(metadataUrl, () => {
                redirect('/');
              });
            } catch (e: any) {
              console.error(e);
              toast.error(e);
            }
          }}
        >
          계정 생성하기
        </Button>
      </div>
    </div>
  );
}
