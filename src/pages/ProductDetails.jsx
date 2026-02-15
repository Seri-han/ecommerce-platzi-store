import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { platziApi } from "../api/platziApi";
import useCartStore from "../store/cartStore";
import { cleanProductName, formatPrice } from "../utils/textFormatter";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/components/productDetails.scss";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    data: product,
    loading,
    error,
    refetch,
  } = useFetch(() => platziApi.getProductById(id), [id]);

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  const imageUrl = product.image ? product.image.trim() : product.images?.[0]?.trim() || null;
  const productName = cleanProductName(product.title);
  const price = formatPrice(product.price);

  return (
    <div className="product-details">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-container">
        <div className="product-image">
          {!imageLoaded && !imageError && <div className="image-skeleton"></div>}

          {imageUrl && !imageError && (
            <img
              src={imageUrl}
              alt={productName}
              className={imageLoaded ? "loaded" : ""}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}

          {(!imageUrl || imageError) && (
            <div className="image-placeholder">
              <span>📦</span>
            </div>
          )}
        </div>

        <div className="product-content">
          <h1>{productName}</h1>
          <p className="category">{product.category?.name}</p>

          <div className="rating">
            ⭐ {product.rating?.rate || "N/A"} ({product.rating?.count || 0} reviews)
          </div>

          <p className="description">{product.description}</p>

          <div className="pricing">
            <span className="price">{price}</span>
          </div>

          <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
