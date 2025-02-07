import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.png';
import { useEffect, useRef, useState } from 'react';
import useFetch from './useFetch';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState(""); 
    const { data } = useFetch(`https://www.omdbapi.com/?s=${query}&apikey=56acf636`);
    
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate(); // ✅ Enables navigation

    const handleInputChange = (e) => {
        setSearch(e.target.value);
        setShowDropdown(e.target.value.length > 0); 
    };

    const handleSearch = () => {
        setQuery(search);
        setShowDropdown(true);
    };

    // ✅ When a movie is selected, navigate to MovieDetails
    const handleSelectMovie = (movie) => {
        setSearch(movie.Title); 
        setShowDropdown(false);
        navigate(`/movieDetails/${movie.imdbID}`); // ✅ Navigate to MovieDetails page
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar bg-[#D3F0F4] px-4 md:px-24 py-4 flex shadow-lg items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-12 h-12" />
                    <p className="font-semibold text-lg ml-2">Movie</p>
                </div>
                
                {/* Search Bar (Desktop) */}
                <div className="relative hidden sm:flex">
                    <input
                        type="text"
                        className="w-72 p-2 pl-8 rounded-lg bg-[#F4FEFF] text-[#111155] focus:outline-none"
                        placeholder="Search for movies and more..."
                        value={search}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button 
                        onClick={handleSearch} 
                        className='bg-[#111155] text-[#ffffff] rounded-lg px-4 py-2 ml-2'>
                        Search
                    </button>
                    
                    {/* Dropdown List (Desktop) */}
                    {showDropdown && data && (
                        <div ref={dropdownRef} className="absolute w-full top-6 mt-2 bg-white 
                        shadow-lg rounded-lg max-h-60 overflow-y-auto">
                            {data.map((movie) => (
                                <div 
                                    key={movie.imdbID} 
                                    className="flex items-center space-x-3 p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleSelectMovie(movie)} // ✅ Click to navigate
                                >
                                    <img src={movie.Poster} alt={movie.Title} className="w-10 h-14 rounded-md" />
                                    <span className="text-[#111155]">{movie.Title}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden sm:flex space-x-4 text-[#111155] text-lg">
                <Link to="/" className="hover:text-[#111155] font-bold">Home</Link>
                <Link to="/series" className="hover:text-[#111155] font-bold">Series</Link>
                <Link to="/movies" className="hover:text-[#111155] font-bold">Movies</Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
                    <i className={`ri-menu-line ${menuOpen ? 'hidden' : 'block'}`}></i>
                    <i className={`ri-close-line ${menuOpen ? 'block' : 'hidden'}`}></i>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="sm:hidden absolute top-16 left-0 w-full bg-[#D3F0F4] p-4">
                    <div className="flex flex-col space-y-4">
                        {/* Mobile Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full p-2 pl-8 rounded-lg bg-[#F4FEFF] text-[#B5CDD0] focus:outline-none"
                                placeholder="Search for movies and more..."
                                value={search}
                                onChange={handleInputChange}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            />
                            <button 
                                onClick={handleSearch} 
                                className='bg-[#111155] text-[#ffffff] rounded-lg px-4 py-2 mt-2 w-full'>
                                Search
                            </button>

                            {/* Mobile Dropdown */}
                            {showDropdown && data && (
                                <div ref={dropdownRef} className="absolute w-full mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
                                    {data.map((movie) => (
                                        <div 
                                            key={movie.imdbID} 
                                            className="flex items-center space-x-3 p-2 hover:bg-gray-200 cursor-pointer"
                                            onClick={() => handleSelectMovie(movie)} // ✅ Click to navigate (Mobile)
                                        >
                                            <img src={movie.Poster} alt={movie.Title} className="w-10 h-14 rounded-md" />
                                            <span className="text-[#111155]">{movie.Title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link to="/" className="text-[#111155] text-lg">Home</Link>
                        <Link to="/series" className="hover:text-[#111155] font-bold">Series</Link>
                        <Link to="/movies" className="hover:text-[#111155] font-bold">Movies</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
