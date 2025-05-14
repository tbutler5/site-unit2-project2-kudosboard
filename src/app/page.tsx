'use client';

import { useEffect, useState } from 'react';
import { BoardGrid } from '@/components/BoardGrid';
import { CategoryButtons } from '@/components/CategoryButtons';
import { NewBoardModal } from '@/components/NewBoardModal';

export default function HomePage() {
  const [boards, setBoards] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [showModal, setShowModal] = useState(false); 

  const categories = ['All', 'Recent', 'Celebration', 'Thank You', 'Inspiration'];

  const handleBoardDelete = (id: number) => {
    setBoards(prev => prev.filter(board => board.id !== id));
  };

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch('/api/boards');
      const data = await response.json();
      setBoards(data);
      setFilteredBoards(data);
    };

    fetchBoards();
  }, []);

  useEffect(() => {
    let updated = [...boards];

    if (selectedCategory !== 'All' && selectedCategory !== 'Recent') {
      updated = updated.filter((board) =>
        board.category.toLowerCase().replace('_', ' ') === selectedCategory.toLowerCase()
      );
    }

    if (search) {
      updated = updated.filter((board) =>
        board.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredBoards(updated);
  }, [search, selectedCategory, boards]);

  return (
    <div className="home-page px-4 py-6 max-w-6xl mx-auto">
      {/* Search */}
      <section className="search mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search boards..."
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </section>

      {/* Category Buttons */}
      <CategoryButtons
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="text-center mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="button-common create-brd-btn bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow"
        >
          Create a New Board
        </button>
      </div>

      {showModal && (
        <NewBoardModal
          onClose={() => setShowModal(false)}
          onCreated={(newBoard) => setBoards([newBoard, ...boards])}
        />
      )}

      {/* Boards */}
      <BoardGrid boards={filteredBoards} onDelete={handleBoardDelete} />
    </div>
  );
}
