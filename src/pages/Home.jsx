import { useState, useEffect } from 'react';
import { platziApi } from '../api/platziApi';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/components/home.scss';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🏠 Fetching featured products...');
      const res = await platziApi.getAllProducts(20);
      console.log('✅ Products loaded:', res.data.length);
      
      setFeatured(res.data.slice(0, 10));
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to load products. Please try again.');
      setFeatured([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Platzi Store</h1>
          <p>Discover amazing products at great prices</p>
          <a href="/categories" className="btn btn-primary">
            Shop Now
          </a>
        </div>
      </section>

      <section className="featured">
        <div className="container">
          <h2>Popular Products</h2>
          
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} onRetry={fetchFeatured} />}
          
          {!loading && !error && featured.length > 0 && (
            <div className="product-grid">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && !error && featured.length === 0 && (
            <div className="empty-state">
              <p>No products available</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}