import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar bg-white">
    <ul>
      <li>
        <Link to='/'>main page</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
    </nav>
  );
}

export default Navbar;

