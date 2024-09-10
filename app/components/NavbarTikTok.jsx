import Link from 'next/link';
import Image from 'next/image';

export default function NavbarTikTok() {
  return (
    <nav className="bg-gradient-to-r from-[#000000] to-[#414141]
     fixed top-0 w-full p-4 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center text-white hover:text-gray-200 transition duration-300">
          <Image
            src="/tiktok.webp"
            width={44}
            height={44}
            alt="Instagram logo"
            className="rounded-full shadow-md"
          />
          <span className="ml-3 text-2xl font-semibold tracking-wide">TikTok Downloader</span>
        </Link>
        <ul className="flex space-x-8 text-lg">
        

          <li>
            <Link href="/" className="text-white hover:text-gray-200 transition duration-300">
              Instagram
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
