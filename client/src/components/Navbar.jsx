import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full z-[1]">
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">Opportune</div>
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            <a href="/companies">Companies</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="text-blue-600 border border-blue-600 rounded-full px-4 py-2 font-semibold"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-orange-600 text-white px-4 py-2 rounded-full"
          >
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
