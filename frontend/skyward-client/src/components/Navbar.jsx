import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold text-blue-600">Skyward Travels</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/book" className="text-gray-700 hover:text-blue-600">Book</Link>
        <Link to="/loyalty" className="text-gray-700 hover:text-blue-600">Loyalty</Link>
        <Link to="/notifications" className="hover:text-blue-600">Notifications</Link>
        <Link to="/reporting" className="hover:text-blue-600">Reporting</Link>

      </div>
    </nav>
  );
}
