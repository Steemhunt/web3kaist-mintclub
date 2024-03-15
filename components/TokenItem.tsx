/* eslint-disable @next/next/no-img-element */
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { CHUNWON_TOKEN_ADDRESS } from '@/constants';
import useBuySell from '@/hooks/useBuySell';
import useERC20Balance from '@/hooks/useERC20Balance';
import useNftBalance from '@/hooks/useNftBalance';
import useNft, { NftDetail } from '@/hooks/useNft';
import useWallet from '@/hooks/useWallet';
import { abbreviateAddress } from '@/utils/strings';
import { commify, shortenNumber, uncommify } from 'mint.club-v2-sdk';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function TokenItem(props: { tokenAddress: `0x${string}` }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { tokenAddress } = props;
  const token = useNft(tokenAddress);

  if (!token?.data) {
    return (
      <div className="flex h-[208px] w-full items-center justify-center border border-gray-500/50 p-5">
        <Loading />
      </div>
    );
  }

  const { name, image, price, sold, maxSupply, address } = token.data;

  return (
    <div className="flex h-fit w-full flex-col border border-gray-500/50 p-5">
      <div className="flex items-center">
        {!imageFailed ? (
          <img
            className="rounded-full border-2 border-white bg-primary/50"
            src={image}
            width={50}
            height={50}
            alt=""
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="h-[50px] w-[50px] rounded-full border-2 border-white bg-primary/50" />
        )}
        <div className="ml-3 flex flex-col">
          <div className="text-lg text-white">@{name}</div>
          <div className="mt-2 text-sm text-gray-500">
            {abbreviateAddress(address)}
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full items-center justify-around text-white">
        <div className="flex w-1/2 flex-col text-center">
          <div className="text-sm  text-gray-500">판매된 친구권</div>
          <div className="mt-1 font-bold">
            {commify(shortenNumber(sold))}개{' '}
            <span className="text-xs text-gray-500">
              /{commify(shortenNumber(maxSupply))}
            </span>
          </div>
        </div>
        <div className="flex w-1/2 flex-col text-center">
          <span className="text-sm  text-gray-500">현재 가격</span>
          <span className="mt-1 font-bold text-green-500">
            {commify(shortenNumber(price * 1000))}원
          </span>
        </div>
      </div>
      <BuySellButtons
        tokenAddress={tokenAddress}
        refresh={token.refresh}
        data={token.data}
      />
    </div>
  );
}

function BuySellButtons(
  props: { tokenAddress: `0x${string}` } & {
    data: NftDetail;
    refresh: ReturnType<typeof useNft>['refresh'];
  },
) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell' | null>(null);
  const [input, setInput] = useState(0);
  const { account } = useWallet();
  const { tokenAddress, data, refresh: refreshToken } = props;
  const { maxSupply, sold } = data;
  const {
    balance,
    loadingBalance,
    refresh: refreshBalance,
  } = useNftBalance(tokenAddress);
  const {
    balance: krwBalance,
    loadingBalance: loadingKrw,
    refresh: refreshKrw,
  } = useERC20Balance(CHUNWON_TOKEN_ADDRESS);

  const { buy, sell, estimating, txLoading, estimation } = useBuySell(
    tradeType,
    tokenAddress,
    Number(input),
  );

  function reset() {
    setTradeType(null);
    setInput(0);
    refresh();
  }

  function refresh() {
    refreshBalance();
    refreshKrw();
    refreshToken();
  }

  return tradeType !== null ? (
    <div className="mt-5 flex flex-col">
      <input
        className="w-full border border-gray-500 bg-transparent p-2 text-sm text-white outline-none"
        inputMode="numeric"
        placeholder={
          tradeType === 'sell' ? '몇개를 판매할까요?' : '몇개를 구매할까요?'
        }
        prefix=""
        autoFocus
        value={input === 0 ? '' : commify(input)}
        onChange={(e) => {
          let value = uncommify(e.target.value);
          let numeric = Number(value.replace(/[^0-9]/g, ''));

          if (tradeType === 'sell') {
            numeric = Math.min(Math.max(numeric, 0), sold);
          }

          if (tradeType === 'buy') {
            numeric = Math.min(numeric, maxSupply - sold);
          }

          setInput(numeric);
        }}
      />

      <div>
        <div className="mt-5 text-xs text-white">
          {tradeType === 'sell' ? '예상 수익' : '예상 비용'}
        </div>
        {input !== undefined && estimating ? (
          <div className="text-yellow-500">가격 계산중...</div>
        ) : (
          <div className="text-green-500">
            {commify(shortenNumber(estimation))}원
          </div>
        )}
        <div className="text-[10px] text-gray-500">{commify(estimation)}원</div>
      </div>

      <div className="relative mt-5 flex gap-2 text-sm">
        <Button
          className="w-full bg-gray-500 text-black"
          onClick={() => {
            reset();
          }}
        >
          취소
        </Button>
        <Button
          className="w-full bg-green-500 text-black"
          loading={estimating || txLoading}
          spinnerColor="grey"
          disabled={!account || !input}
          onClick={async () => {
            console.log('buy or sell');
            try {
              if (tradeType === 'sell') {
                await sell(() => {
                  toast.success('거래가 성공적으로 완료되었습니다');
                  reset();
                });
              } else {
                await buy(() => {
                  toast.success('거래가 성공적으로 완료되었습니다');
                  reset();
                });
              }
            } catch (e) {
              console.error(e);
            }
          }}
        >
          {tradeType === 'sell' ? '판매' : '구매'}
        </Button>
        {!account && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs font-bold text-white backdrop-blur-sm">
            로그인이 필요합니다
          </div>
        )}
      </div>
      <div className="mt-5 flex items-center text-xs text-gray-500">
        현재{' '}
        <span className="mx-1 flex items-center text-white">
          {loadingBalance ? (
            <Loading className="mx-1 inline-block" size={12} />
          ) : (
            commify(shortenNumber(balance))
          )}
          개
        </span>
        보유중
      </div>
      <div className="mt-2 flex items-center text-xs text-gray-500">
        내 잔고{' '}
        <span className="mx-1 flex items-center text-green-500">
          {loadingKrw ? (
            <Loading className="mx-1 inline-block" size={12} />
          ) : (
            commify(krwBalance * 1000)
          )}{' '}
          KRW
        </span>
      </div>
    </div>
  ) : (
    <div className="relative mt-5 flex gap-2 text-sm">
      <Button
        className="w-full bg-gray-500 text-black"
        onClick={() => setTradeType('sell')}
      >
        판매
      </Button>
      <Button className="w-full" onClick={() => setTradeType('buy')}>
        구매
      </Button>
      {!account && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs font-bold text-white backdrop-blur-sm">
          로그인이 필요합니다
        </div>
      )}
    </div>
  );
}
