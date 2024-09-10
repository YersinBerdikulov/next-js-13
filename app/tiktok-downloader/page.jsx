'use client';

import Image from "next/image";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function TiktokHandler() {
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
                    
                    // Pass the full TikTok URL directly to the API
                    const tiktokResponse = await fetch(`https://tiktok-scraper7.p.rapidapi.com/?url=${encodeURIComponent(decodedUrl)}&hd=1`, {
                        method: 'GET',
                        headers: {
                            'x-rapidapi-key': '1a3a512480msh378d3c082a3a83dp1d9e96jsne320ff037b16',
                            'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com'
                        }
                    });
    
                    if (!tiktokResponse.ok) {
                        const errorText = await tiktokResponse.text();
                        throw new Error(`HTTP error! status: ${tiktokResponse.status}, details: ${errorText}`);
                    }
    
                    const tiktokResult = await tiktokResponse.json();
                    console.log("Profile API Response:", tiktokResult);
    
                    // Check if the data object exists in the response
                    if (tiktokResult && tiktokResult.data) {
                        const { author, region, music_info, share_count, play, title } = tiktokResult.data;
    
                        // Set values based on API response structure
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
                    setError(error.message); // Set the error message
                    console.error("Fetch error:", error);
                }
            }
        };
    
        fetchData();
    }, [tiktokUrlParam]);

    return (
        <div className=" bg-gradient-to-br from-[#69C9D0] to-[#EE1D52] min-h-screen flex items-center justify-center">
            <main className="bg-white mt-7 mb-4     p-10 rounded-lg shadow-lg w-full max-w-2xl">
                {error ? (
                    <p className="text-xl text-red-600">{error}</p>
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
                                <h1 className="mt-4 text-2xl font-bold text-gray-800">{author}</h1>
                            )}
                            {name && (
                                <p className="mt-2 text-center text-gray-600">{name}</p>
                            )}
                            {location && shareCount && (
                                <div className="mt-4 flex space-x-8 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors justify-start items-center">
                                <div className="flex items-center">
                                <p className="text-2xl font-bold text-gray-800">{location}</p>
                                </div>
                            <div className="flex items-center space-x-3">
                            <Image
                            src="/8468899.png"
                            alt="Share Icon"
                            width={24}
                            height={24}
                            className="shadow-sm"
                        />
                        <h1 className="text-xl font-semibold text-gray-700">{shareCount} Shares</h1>
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
                            <h1 className="mt-4 text-2xl">Music:</h1>
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
                        <p className="text-xl text-gray-600">Loading profile picture...</p>
                    )
                )}
            </main>
        </div>
    );
}
