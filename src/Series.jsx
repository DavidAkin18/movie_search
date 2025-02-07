import { Link } from "react-router-dom";
import useFetch from "./useFetch";

const Series = () => {
    const { data: series, error, isLoading } = useFetch('https://www.omdbapi.com/?s=batman&apikey=56acf636&type=series');


    return ( 
        <div className="series py-6 bg-gray-100 min-h-screen px-4 md:px-28 py-8 ">
            {error && <div className="text-red-500 text-center">{error}</div>}
            {isLoading && <div className="text-center text-lg">Loading...</div>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {series && series.map((item) => (  // ✅ Mapping through series.Search
                    <div key={item.imdbID} className="bg-white rounded-lg shadow-lg p-4">
                        <img src={item.Poster} alt={item.Title} className="w-full h-[300px] object-cover rounded-md" />
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">{item.Year}</p>
                            <h3 className="text-lg font-semibold">{item.Title}</h3>
                            <p className="text-sm text-gray-600">Type: {item.Type}</p>
                            <Link to={`/movieDetails/${item.imdbID}`}>
                                <button className="mt-3 bg-blue-800 text-white py-2 px-4 rounded-lg w-full">
                                    See Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Series;
