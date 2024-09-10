import Image from 'next/image';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import Text from './components/Text';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-[#ab43b0] to-[#F77737]">
      <Navbar/>
      <h1 className="text-4xl font-bold text-white mb-8">Instagram Anonymous Viewer</h1>
      <SearchForm/>
      <Text />
    </main>
  );
}
