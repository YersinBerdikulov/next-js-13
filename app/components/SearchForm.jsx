"use client"; // Mark this component as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (username) {
      // Redirect to the user profile page with the search query
      router.push(`/user-profile?username=${encodeURIComponent(username)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-sm p-5 md:p-7 mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Instagram ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-pink-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition-all"
      >
        Search
      </button>
    </form>
  );
}
