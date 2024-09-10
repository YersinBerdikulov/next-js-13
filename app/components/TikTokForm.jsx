"use client"; // Mark this component as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TikTokForm() {
  const [video, setVideo] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (video) {
      // Redirect to the user profile page with the search query
      router.push(`/tiktok-downloader?video=${encodeURIComponent(video)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-sm p-7 mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter TikTok URL"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          className="w-full p-3 rounded-lg text-black border border-gray-300 focus:border-blue-500 focus:outline-none transition-all"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-700 transition-all"
      >
        Search for video
      </button>
    </form>
  );
}
