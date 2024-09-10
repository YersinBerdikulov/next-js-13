import Image from 'next/image';
import Navbar from '../components/Navbar';
import SearchForm from '../components/TikTokForm';

import TikTokForm from '../components/TikTokForm';
import TextTikTok from '../components/TextTikTok';
import NavbarTikTok from '../components/NavbarTikTok';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-[#69C9D0] to-[#EE1D52]
">
      <NavbarTikTok/>
      <h1 className="text-4xl font-bold text-white mb-8">Tik tok Downlaod video</h1>
      <TikTokForm />
      <TextTikTok/>
    </main>
  );
}
