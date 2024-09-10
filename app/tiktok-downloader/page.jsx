// app/tiktok-downloader/page.js
"use client"; // Ensure this component is client-side

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SuspenseBoundary from '../components/SuspenseBoundary'; // Make sure you have this component
import Image from 'next/image';

export default function TikTokDownloader() {
  const [author, setAuthor] = useState(null);
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [musicInfo, setMusicInfo] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [shareCount, setShareCount] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const tiktokUrlParam = searchParams.get('video');

  useEffect(() => {
    const fetchData = async () => {
      if (tiktokUrlParam) {
        try {
          const decodedUrl = decodeURIComponent(tiktokUrlParam);
          
          const tiktokResponse = await fetch(`https://tiktok-scraper7.p.rapidapi.com/?url=${encodeURIComponent(decodedUrl)}&hd=1`, {
            method: 'GET',
            headers: {
                  'x-rapidapi-key': '684f3639b7msh8a8323ad7a4921bp1c189fjsn00397eeec556',
                  'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com'
            }
          });

          if (!tiktokResponse.ok) {
            const errorText = await tiktokResponse.text();
            throw new Error(`HTTP error! status: ${tiktokResponse.status}, details: ${errorText}`);
          }

          const tiktokResult = await tiktokResponse.json();
          console.log("Profile API Response:", tiktokResult);

          if (tiktokResult && tiktokResult.data) {
            const { author, region, music_info, share_count, play, title } = tiktokResult.data;

            if (author && author.avatar) {
              setAvatar(author.avatar);
            }
            if (play) {
              setVideoUrl(play);
            }
            if (author) {
              setAuthor(author.nickname);
            }
            if (region) {
              setLocation(region);
            }
            if (music_info && music_info.play) {
              setMusicInfo(music_info.play);
            }
            if (share_count) {
              setShareCount(share_count);
            }
            if (title) {
              setName(title);
            }
          } else {
            throw new Error("Unexpected profile API response format or data not found.");
          }
        } catch (error) {
          setError(error.message);
          console.error("Fetch error:", error);
        }
      }
    };

    fetchData();
  }, [tiktokUrlParam]);

  return (
    <SuspenseBoundary>
      <div className="bg-gradient-to-br from-[#69C9D0] to-[#EE1D52] min-h-screen flex items-center justify-center p-4">
        <main className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
          {error ? (
            <p className="text-lg md:text-xl text-red-600">{error}</p>
          ) : (
            avatar ? (
              <div className="flex flex-col items-center">
                <Image
                  src={avatar}
                  alt="Profile picture"
                  width={150}
                  height={150}
                  className="rounded-full border-4 border-purple-500 shadow-lg"
                />
                {author && (
                  <h1 className="mt-4 text-xl md:text-2xl font-bold text-gray-800">{author}</h1>
                )}
                {name && (
                  <p className="mt-2 text-center text-base md:text-lg text-gray-600">{name}</p>
                )}
                {location && shareCount && (
                  <div className="mt-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors">
                    <div className="flex items-center">
                      <p className="text-lg md:text-2xl font-bold text-gray-800">{location}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/8468899.png"
                        alt="Share Icon"
                        width={24}
                        height={24}
                        className="shadow-sm"
                      />
                      <h1 className="text-base md:text-xl font-semibold text-gray-700">{shareCount} Shares</h1>
                    </div>
                  </div>
                )}
                {videoUrl && (
                  <video
                    controls
                    src={videoUrl}
                    className="mt-4 w-full rounded-lg shadow-lg"
                  />
                )}
                <h1 className="mt-4 text-xl md:text-2xl">Music:</h1>
                {musicInfo && (
                  <audio
                    controls
                    src={musicInfo}
                    className="mt-4 w-full rounded-lg shadow-sm"
                  >
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            ) : (
              <p className="text-lg md:text-xl text-gray-600">Loading profile picture...</p>
            )
          )}
        </main>
      </div>
    </SuspenseBoundary>
  );
}
