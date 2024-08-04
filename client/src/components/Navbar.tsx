import { Link, useNavigate } from "react-router-dom";
import Logo from "../img/logo.png";
import { Button } from "./ui/button";
import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(window.innerWidth > 800);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      await axios.get("http://localhost:5000/posts");
      navigate(user ? "/post" : "/login");
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const categoryArray = [
    "Education",
    "Sciences",
    "Business",
    "Fashion",
    "Technology",
    "Uncategorized",
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setMenuOpen(true);
      } else {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <nav className="w-full h-20 grid place-items-center bg-white bg-opacity-50 fixed top-0 left-0 z-10 border-b-4 border-gray-200 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        <Link to="/" className="flex-shrink-0" onClick={closeNavHandler}>
          <img src={Logo} alt="Navbar Logo" className="w-10" />
        </Link>
        {menuOpen && (
          <ul className="hidden md:flex space-x-6">
            {categoryArray.map((category, index) => (
              <li key={index}>
                <Button variant="link" size="default" className="text-gray-800" asChild>
                  <Link to={`/?category=${category}`} onClick={closeNavHandler}>
                    {category}
                  </Link>
                </Button>
              </li>
            ))}
            <li>
              {user ? (
                <>
                  <Button variant="hust" className="p-4 font-semibold" onClick={logout}>
                    Logout
                  </Button>
                  <Button variant="hust" className="font-bold" onClick={handleClick}>
                    New post
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="hust" className="p-4 font-semibold mr-4">
                      Register
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="hust" className="p-4 font-semibold">
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </li>
          </ul>
        )}
        <button
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <AiOutlineClose className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start px-4 py-2 space-y-4">
          {categoryArray.map((category, index) => (
            <Button
              key={index}
              variant="link"
              size="default"
              className="text-gray-800"
              asChild
            >
              <Link to={`/?category=${category}`} onClick={closeNavHandler}>
                {category}
              </Link>
            </Button>
          ))}
          <div className="flex flex-col items-start space-y-2 mt-4">
            {user ? (
              <>
                <Button
                  variant="hust"
                  className="p-4 font-semibold"
                  onClick={logout}
                >
                  Logout
                </Button>
                <Button
                  variant="hust"
                  className="font-bold"
                  onClick={handleClick}
                >
                  New post
                </Button>
              </>
            ) : (
              <>
                  <Link to="/register">
                    <Button variant="hust" className="p-4 font-semibold bg-gray-900 text-white mb-2">Register</Button>
                  </Link>
              
                  <Link to="/login">
                     <Button variant="hust" className="p-4 font-semibold bg-gray-900 text-white"> Login </Button>
                  </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
