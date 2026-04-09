import { Search, SlidersHorizontal } from "lucide-react";
import { PRODUCT_CATEGORIES } from "../../utils/constants";

function ProductFilters({ filters, onFilterChange, onReset, resultsCount }) {
  return (
    <div className="surface-card mb-8 p-5 sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-muted)]">Search & Filter</p>
          <p className="mt-2 text-lg font-semibold text-[color:var(--text-primary)]">
            {resultsCount} products matched
          </p>
        </div>
        <button type="button" className="secondary-button" onClick={onReset}>
          Reset Filters
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
        <label className="surface-muted flex items-center gap-3 px-4 py-3">
          <Search size={18} className="text-cyan-300" />
          <input
            type="text"
            value={filters.search}
            onChange={(event) => onFilterChange("search", event.target.value)}
            placeholder="Search phones, laptops, accessories..."
            className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-muted)]"
          />
        </label>

        <label className="surface-muted flex items-center gap-3 px-4 py-3">
          <SlidersHorizontal size={18} className="text-cyan-300" />
          <select
            value={filters.category}
            onChange={(event) => onFilterChange("category", event.target.value)}
            className="w-full bg-transparent text-sm text-[color:var(--text-primary)] outline-none"
          >
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <input
          type="number"
          min="0"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={(event) => onFilterChange("minPrice", event.target.value)}
          className="field"
        />

        <input
          type="number"
          min="0"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={(event) => onFilterChange("maxPrice", event.target.value)}
          className="field"
        />

        <select
          value={filters.sort}
          onChange={(event) => onFilterChange("sort", event.target.value)}
          className="field"
        >
          <option value="rating">Top rated</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="title">Title: A to Z</option>
        </select>
      </div>
    </div>
  );
}

export default ProductFilters;
