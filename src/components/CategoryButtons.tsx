interface CategoryButtonsProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryButtons = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryButtonsProps) => {
  return (
    <nav
      className="category-buttons mb-6 flex flex-wrap gap-2"
      role="navigation"
      aria-label="Filter boards by category"
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`button-common category-button font-medium py-2 px-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            selectedCategory === cat
              ? 'bg-indigo-600 text-white'
              : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800'
          }`}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
};
