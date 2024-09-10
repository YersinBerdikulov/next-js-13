import dynamic from 'next/dynamic';

const TikTokForm = dynamic(() => import('../components/TikTokForm'), {
    ssr: false, // Disable server-side rendering for this component
});

const TextTikTok = dynamic(() => import('../components/TextTikTok'), {
    ssr: false, // Disable server-side rendering for this component
});

const NavbarTikTok = dynamic(() => import('../components/NavbarTikTok'), {
    ssr: false, // Disable server-side rendering for this component
});

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-[#69C9D0] to-[#EE1D52]">
            <NavbarTikTok />
            <h1 className="text-4xl font-bold text-white mb-8">TikTok Download Video</h1>
            <TikTokForm />
            <TextTikTok />
        </main>
    );
}
