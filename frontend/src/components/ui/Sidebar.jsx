import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="w-40 h-screen bg-brandPink text-white p-4 flex flex-col gap-4">
      <Link to="/" className="hover:text-yellow-200">🏠 Home</Link>
      <Link to="/math" className="hover:text-yellow-200">➕ Math</Link>
      <Link to="/reading" className="hover:text-yellow-200">📖 Reading</Link>
      <Link to="/spelling" className="hover:text-yellow-200">📝 Spelling</Link>
      <Link to="/shop" className="hover:text-yellow-200">🛍️ Shop</Link>
      <Link to="/profile" className="hover:text-yellow-200">👤 Profile</Link>
    </nav>
  );
}
