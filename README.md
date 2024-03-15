# 시작하기

이 프로젝트는 Next.js 로 만들어진 프로젝트입니다.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 데모

무엇을 만들지 한번 눈팅해볼까여

[Demo](https://farkaster.vercel.app)

## 로컬에 개발환경 세팅하기

```bash
git clone git@github.com:Steemhunt/orakle-mintclub.git

npm i

npm run dev
```

## 환경변수 설정하기

```
1. https://filebase.com/ 가입
2. https://console.filebase.com/buckets -> Buckets 가서 IPFS 버켓생성
3. https://console.filebase.com/buckets -> Access Keys 가서 "Choose Bucket To Generate Token" -> "만든 버켓 이름 선택"
4. Repo 안에 첨부된 .env.example -> .env 복사
5. FILEBASE_API_KEY="여기에 api 키 넣어놓기"
```

## 미션 하나씩 깨보기

ctrl+f 로 에디터에서 `TODO:` 검색해보면 하나씩 직접 구현해보는 코드블럭들이 존재합니다.

[https://sdk.mint.club](https://sdk.mint.club) 에서 힌트를 얻으실수있습니다!

`TODO` 가 없는 코드도 원하신다면 자유로 수정하셔도 됩니다.

## 내가 만든거 배포해보기

[vercel](https://vercel.com) 가입

터미널에서

```
npx vercel
```

하면 만들어놓은 사이트를 다른사람한테도 공유할수있습니다.
