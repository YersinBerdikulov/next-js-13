import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-[#d743ab] to-[#d46317]
 fixed top-0 w-full p-4 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center text-white hover:text-gray-200 transition duration-300">
          <Image
            src="/instagram-logo-instagram-icon-transparent-free-png.webp"
            width={44}
            height={64}
            alt="Instagram logo"
            className="rounded-full "
          />
          <span className="ml-3 text-2xl font-semibold tracking-wide">Instagram Viewer</span>
        </Link>
        <ul className="flex space-x-8 text-lg">
        
  
          <li>
            <Link href="/tiktok" className="text-white hover:text-gray-200 transition duration-300">
              TikTok
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
