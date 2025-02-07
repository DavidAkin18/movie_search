import Hero from "./Hero";
import MovieList from "./MovieList";
import useFetch from './useFetch'

const Home = () => {
    const { data:movies, isLoading, error } = useFetch('https://www.omdbapi.com/?s=batman&apikey=56acf636');

    return ( 
        <div className="home bg-[#D3F0F4] min-h-screen px-4 md:px-28 py-8">

            <Hero/>
            {error && <div>{error}</div>}
            {isLoading && <div>loading...</div>}
            {movies && <MovieList movies={movies} isLoading={isLoading} error={error} />}
        </div>
     );
}
 
export default Home;