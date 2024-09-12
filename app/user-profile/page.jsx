"use client"; // Mark this component as a Client Component

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

export default function UserProfile() {
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [username, setUsername] = useState(null);
  const [biography, setBiography] = useState(null);
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const [is_private, setIs_private] = useState(null);
  const [external, setExternal] = useState(null);
  const [country,setCountry] = useState(null)
  const [join,setJoin] = useState(null)
  const [followers,setFollowers] = useState(null)
  const [following,setFolowing] = useState(null)


  const usernameUrlParam = searchParams.get('username');

  useEffect(() => {
    const fetchData = async () => {
      if (usernameUrlParam) {
        try {
          const decodedUrl = decodeURIComponent(usernameUrlParam);
          const extractedUsername = new URL(decodedUrl).pathname.split('/')[1];

          const profileResponse = await fetch(`https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${encodeURIComponent(extractedUsername)}`, {
            method: 'GET',
            headers: {
             'x-rapidapi-key': '684f3639b7msh8a8323ad7a4921bp1c189fjsn00397eeec556',
             'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
            }
          });

          if (!profileResponse.ok) {
            const errorText = await profileResponse.text();
            throw new Error(`HTTP error! status: ${profileResponse.status}, details: ${errorText}`);
          }

          const profileResult = await profileResponse.json();
          console.log("Profile API Response:", profileResult.data.is_private);

          if (profileResult && profileResult.data) {
            const { hd_profile_pic_url_info, username, biography, external_url, is_private,about,follower_count,following_count } = profileResult.data;

            if (hd_profile_pic_url_info && hd_profile_pic_url_info.url) {
              setProfilePicUrl(hd_profile_pic_url_info.url);
            }

            if (username) {
              setUsername(username);
            }
            if(follower_count){
              setFollowers(follower_count)
            }
            if(following_count){
              setFolowing(following_count)
            }

            if (biography) {
              setBiography(biography);
            }
            if(about && about.country){
              setCountry(about.country)
            }
            if(about && about.join){
              setJoin(about.join)
            }
            if (external_url) {
              setExternal(external_url);
            }
            setIs_private(is_private); // Set is_private regardless of its value
            
          } else {
            throw new Error("Unexpected profile API response format.");
          }

          const storiesResponse = await fetch(`https://instagram-scraper-api2.p.rapidapi.com/v1/stories?username_or_id_or_url=${encodeURIComponent(extractedUsername)}`, {
            method: 'GET',
            headers: {
            'x-rapidapi-key': '684f3639b7msh8a8323ad7a4921bp1c189fjsn00397eeec556',
           'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
            }
          });

          if (!storiesResponse.ok) {
            const errorText = await storiesResponse.text();
            throw new Error(`HTTP error! status: ${storiesResponse.status}, details: ${errorText}`);
          }

          const storiesResult = await storiesResponse.json();
          console.log("Stories API Response:", storiesResult);

          if (storiesResult && storiesResult.data && storiesResult.data.items) {
            setStories(storiesResult.data.items);
          } else {
            throw new Error("Unexpected stories API response format.");
          }

        } catch (error) {
          setError(error.message);
          console.error("Fetch error:", error);
        }
      }
    };

    fetchData();
  }, [usernameUrlParam]);

  const downloadMedia = async (url, e) => {
    e.preventDefault();

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch media.");
      }

      const blob = await response.blob();
      console.log("Blob type:", blob.type);
      console.log("URL:", url);

      const link = document.createElement('a');
      const contentType = response.headers.get('Content-Type');
      let extension = '';

      if (contentType.includes('video')) {
        extension = 'mp4';
      } else if (contentType.includes('image')) {
        extension = contentType.split('/')[1] || 'jpg';
      } else {
        extension = 'bin';
      }

      const objectURL = URL.createObjectURL(blob);
      link.href = objectURL;
      link.setAttribute('download', `story.${extension}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error("Error downloading the media:", error);
    }
  };

  if (error) {
    return <p className="text-red-500">Error fetching data: {error}</p>;
  }

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center p-4">
      <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">

        {profilePicUrl ? (
          <>
            <div className="flex flex-col items-center">
              <Image
                src={profilePicUrl}
                alt="Profile picture"
                width={150}
                height={150}
                className={`rounded-full border-4 ${
                  stories.length > 0 
                    ? 'bg-gradient-to-r from-black to-red-500 border-pink-500' 
                    : 'border-white'
                } shadow-lg`}
              />

              {username && (
                <h1 className="mt-4 text-2xl font-bold text-gray-800">{username}</h1>
              )}
              {followers && (
                <div className='flex  space-x-3' >
                
                <p className="mt-2 flex items-start justify-start text-xl  text-black">Followers: {followers}</p>
              
                </div>
           
              )}
              {following && (
                <div className='flex space-x-3'>
              
                <p className="mt-2  text-xl items-end justify-start  text-black "> Following: {following}</p>
                </div>
              )}
              {biography && (
                <p className="mt-2 text-center text-gray-600">{biography}</p>
              )}
              <h1 className="mt-4 text-center text-gray-950">{is_private ? 'Private Account' : 'Public Account'}</h1>
              {external && (
                <div className='mt-2 text-center text-blue-300 flex flex-row items-center space-x-2'>
                  <Image
                    src="/4906292.png"
                    alt="Links image"
                    width={24}
                    height={24}
                  />
                  <a href={external} className="underline" target="_blank" rel="noopener noreferrer">
                    {external}
                  </a>
                </div>
              )}
              {country && (
                <p className="mt-2 text-center text-gray-600">{country}</p>
              )}
              {join && (
                <p className="mt-2 text-center text-gray-600">{join}</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-xl text-gray-600">Loading profile picture...</p>
        )}

        {stories.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Stories</h2>
            <Swiper
              spaceBetween={30}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {stories.map((story, index) => (
                <SwiperSlide key={index}>
                  <div className="relative flex flex-col items-center">
                    {story.media_type === 1 ? (
                      <div className="relative">
                        <Image
                          src={story.image_versions?.[0]?.url || story.thumbnail_url}
                          alt={`Story ${index + 1}`}
                          width={300}
                          height={500}
                          className="object-cover rounded-lg shadow-md"
                        />
                        <button
                          onClick={(e) => downloadMedia(story.image_versions?.[0]?.url || story.thumbnail_url, e)}
                          className="absolute top-2 right-2 px-2 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                        >
                          Download
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <video
                          controls
                          width={300}
                          className="rounded-lg shadow-md"
                        >
                          <source src={story.video_versions?.[0]?.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <button
                          onClick={(e) => downloadMedia(story.video_versions?.[0]?.url, e)}
                          className="absolute top-2 right-2 px-2 py-1 bg-pink-500 text-white rounded-md shadow-md hover:bg-pink-600"
                        >
                          Download
                        </button>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <p className="text-lg mt-4 text-gray-600">No stories available</p>
        )}

      </main>
    </div>
  );
}
