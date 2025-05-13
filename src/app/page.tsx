'use client';

import { useEffect, useState } from 'react';
import { BoardGrid } from '@/components/BoardGrid';
import { CategoryButtons } from '@/components/CategoryButtons';

export default function HomePage() {
  const [boards, setBoards] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredBoards, setFilteredBoards] = useState([]);

  // Categories for filtering
  const categories = ['All', 'Recent', 'Celebration', 'Thank You', 'Inspiration'];

  // Fetch boards from the backend API
  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch('/api/boards');
      const data = await response.json();
      setBoards(data);
      setFilteredBoards(data);
    };

    fetchBoards();
  }, []);

  // Handle search filtering
  useEffect(() => {
    if (!search) {
      setFilteredBoards(boards);
    } else {
      setFilteredBoards(
        boards.filter((board) =>
          board.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, boards]);

  return (
    <div className="home-page px-4 py-6 max-w-6xl mx-auto">
      {/* Search Bar */}
      <section className="search mb-6">
        <label htmlFor="search-input" className="sr-only">
          Search Boards
        </label>
        <input
          id="search-input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search boards..."
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </section>

      {/* Categories */}
      <CategoryButtons categories={categories} />

      {/* Create Button */}
      <div className="center-button-container text-center mb-8">
        <button
          className="button-common create-brd-btn bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          aria-label="Create a new board"
        >
          Create a New Board
        </button>
      </div>

      {/* Boards Grid */}
      <BoardGrid boards={filteredBoards} />
    </div>
  );
}
