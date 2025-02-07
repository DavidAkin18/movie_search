import { Link } from "react-router-dom";

const MovieList = ({movies, error, isLoading}) => {
  
    console.log(movies);
    return ( 
        <div className="py-24">
            {error && <div className="text-red-500 text-center">{error}</div>}
            {isLoading && <div className="text-center text-lg">Loading...</div>}

            {movies &&  
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies?.map((movie) => (
                        <div key={movie.imdbID} className="bg-white rounded-lg shadow-lg p-4">
                            <img src={movie.Poster} alt={movie.Title} className="w-full h-[300px] object-cover rounded-md" />
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">{movie.Year}</p>
                                <h3 className="text-lg font-semibold">{movie.Title}</h3>
                                <p className="text-sm text-gray-600">Type: {movie.Type}</p>
                                <Link to={`/movieDetails/${movie.imdbID}`}>
                                    <button className="mt-3 bg-blue-800 text-white py-2 px-4 rounded-lg w-full">
                                        See Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default MovieList;
