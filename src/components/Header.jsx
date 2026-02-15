import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import '../styles/components/header.scss';

export default function Header() {
  const cartItems = useCartStore(state => state.cart);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Platzi Store
        </Link>

        <nav className="nav">
          {/* <Link to="/">Home</Link> */}
          <Link to="/categories">Categories</Link>
        </nav>

        <Link to="/cart" className="cart-link">
          <span className="cart-icon">🛒</span>
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>
      </div>
    </header>
  );
}