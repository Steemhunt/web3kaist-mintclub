import { GradientBG } from '@/components/GradientCanvas';
import Header from '@/components/Header';
import ClientToaster from '@/components/Toaster';
import { sharedMetadata } from '@/constants/metadata';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Noto_Sans, Noto_Sans_KR } from 'next/font/google';

const NotoSansKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['500', '600'] });
const NotoSans = Noto_Sans({ subsets: ['latin'], weight: ['500', '600'] });

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NotoSansKR.className} ${NotoSans.className}`}>
        <GradientBG />
        <div className="relative z-10 h-screen w-screen overflow-y-scroll text-white hide-scrollbar">
          <Header />
          <div className="flex h-full w-full flex-col py-10 mobile:py-20">
            {children}
          </div>
        </div>
        <ClientToaster />
      </body>
    </html>
  );
}
