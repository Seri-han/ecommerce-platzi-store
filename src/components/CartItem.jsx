import useCartStore from '../store/cartStore';
import { formatPrice } from '../utils/textFormatter';
import { getImageUrl } from '../utils/imageHandler';
import '../styles/components/cartItem.scss';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCartStore();
  const imageUrl = getImageUrl(item);
  
  // Ensure proper types
  const itemPrice = parseFloat(item.price) || 0;
  const itemQuantity = parseInt(item.quantity) || 1;
  const itemTotal = itemPrice * itemQuantity;

  console.log(`CartItem ${item.id}: price=${itemPrice}, qty=${itemQuantity}, total=${itemTotal}`);

const handleQuantityChange = (newQuantity) => {
  const qty = parseInt(newQuantity);

  if (isNaN(qty)) return;

  if (qty < 1) {
    removeFromCart(item.id);
    return;
  }

  updateQuantity(item.id, qty);
};


  return (
    <article className="cart-item">
      {imageUrl ? (
        <img 
          src={imageUrl}
          alt={item.title}
          className="cart-item-image"
          onError={(e) => {
            console.error('❌ Cart image error:', imageUrl);
            e.style.display = 'none';
          }}
        />
      ) : (
        <div className="cart-item-image" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2d2d2d',
          color: '#9ca3af'
        }}>
          📦
        </div>
      )}

      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="price">{formatPrice(itemPrice)}</p>
      </div>

      <div className="cart-item-controls">
        <button 
          className="qty-btn"
          onClick={() => handleQuantityChange(itemQuantity - 1)}
          title="Decrease quantity"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input 
          type="number" 
          value={itemQuantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          min="1"
          className="qty-input"
          title="Quantity"
          aria-label="Quantity"
        />
        <button 
          className="qty-btn"
          onClick={() => handleQuantityChange(itemQuantity + 1)}
          title="Increase quantity"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="cart-item-total">
        <span>{formatPrice(itemTotal)}</span>
      </div>

      <button 
        className="btn-remove"
        onClick={() => removeFromCart(item.id)}
        title="Remove item"
        aria-label="Remove item"
      >
        ✕
      </button>
    </article>
  );
}