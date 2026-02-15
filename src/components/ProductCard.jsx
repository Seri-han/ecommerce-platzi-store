import { Link } from "react-router-dom";
import { useState } from "react";
import useCartStore from "../store/cartStore";
import { cleanProductName, truncateText, formatPrice } from "../utils/textFormatter";
import "../styles/components/productCard.scss";

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  const productName = cleanProductName(product.title);
  const displayName = truncateText(productName, 50);
  const imageUrl = product.image ? product.image.trim() : product.images?.[0]?.trim() || null;
  const price = formatPrice(product.price);

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-link">
        <div className="product-image">
          {/* Skeleton while loading */}
          {!imageLoaded && !imageError && <div className="image-skeleton"></div>}

          {/* Actual image */}
          {imageUrl && !imageError && (
            <img
              src={imageUrl}
              alt={displayName}
              className={imageLoaded ? "loaded" : ""}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}

          {/* Placeholder if image fails */}
          {(!imageUrl || imageError) && (
            <div className="image-placeholder">
              <span>📦</span>
            </div>
          )}

          <div className="product-overlay">
            <span className="view-btn">View Details</span>
          </div>
        </div>
      </Link>

      <div className="product-info">
        <h3 title={productName}>
          <Link to={`/products/${product.id}`}>{displayName}</Link>
        </h3>

        <p className="product-category">
          {product.category?.name || "Uncategorized"}
        </p>

        <div className="product-footer">
          <span className="price">{price}</span>
          <button
            className={`btn-add-cart ${isAdding ? "adding" : ""}`}
            onClick={handleAddToCart}
            title="Add to cart"
            disabled={isAdding}
          >
            {isAdding ? "✓" : "+"}
          </button>
        </div>
      </div>
    </article>
  );
}
