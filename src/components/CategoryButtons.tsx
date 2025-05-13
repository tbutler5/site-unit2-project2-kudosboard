interface CategoryButtonsProps {
    categories: string[];
  }
  
export const CategoryButtons = ({ categories }: CategoryButtonsProps) => {
    return (
      <nav
        className="category-buttons mb-6 flex flex-wrap gap-2"
        role="navigation"
        aria-label="Filter boards by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            className="button-common category-button bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium py-2 px-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {cat}
          </button>
        ))}
      </nav>
    );
};
  