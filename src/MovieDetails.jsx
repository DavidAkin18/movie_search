import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieDetails = () => {
    const { imdbID } = useParams();  // Get the movie ID from URL params
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=56acf636`)
            .then((res) => {
                if(!res.ok){
                    throw new Error("Could not fetch movie details.");
                }
                return res.json();
            })
            .then((data)=>{
                setMovie(data)
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    },[imdbID])

    return (
        <div className="min-h-screen px-4 md:px-28 py-8 bg-gray-100">
            {error && <div className="text-red-500 text-center">{error}</div>}
            {isLoading && <div className="text-center text-lg">Loading...</div>}

            {movie && (
                <div className="space-y-8 space-x-4 flex items-center">
                   <div> <img src={movie.Poster} alt={movie.Title} className="rounded-lg" /></div>
                    <div>
                        <h2 className="text-2xl font-bold mt-4">{movie.Title}</h2>
                        <p className="text-gray-600">{movie.Year} | {movie.Genre}</p>
                        <p className="mt-3">{movie.Plot}</p>
                        <p className="mt-2"><strong>Director:</strong> {movie.Director}</p>
                        <p className="mt-2"><strong>Actors:</strong> {movie.Actors}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
