import { useState, useEffect } from 'react';
import { platziApi } from '../api/platziApi';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/components/categories.scss';

export default function Categories() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 12;

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm, sortBy]);

  const fetchCategories = async () => {
    try {
      console.log('📂 Fetching all categories...');
      const res = await platziApi.getAllCategories();
      console.log('✅ Categories loaded:', res.data.length);
      setCategories(res.data);
    } catch (err) {
      console.error('❌ Error loading categories:', err);
      setError('Failed to load categories');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let res;
      if (selectedCategory) {
        console.log('📦 Fetching products for category:', selectedCategory);
        res = await platziApi.getProductsByCategory(selectedCategory);
      } else {
        console.log('📦 Fetching all products...');
        res = await platziApi.getAllProducts(50);
      }

      let filtered = res.data || [];
      
      // Filter by search
      if (searchTerm) {
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Sort
      filtered.sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return a.title.localeCompare(b.title);
      });

      setProducts(filtered);
      setCurrentPage(1);
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="categories">
      <aside className="filters">
        <div className="filter-group">
          <h3>Categories</h3>
          <button
            className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
              title={cat.name}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Sort By</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </aside>

      <section className="products-section">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} onRetry={fetchProducts} />}

        {!loading && !error && paginatedProducts.length === 0 && (
          <div className="empty-state">
            <p>No products found</p>
          </div>
        )}

        {!loading && !error && paginatedProducts.length > 0 && (
          <>
            <div className="product-grid">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="pagination-btn"
                >
                  Previous
                </button>
                
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}