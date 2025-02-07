import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Correct imports
import Navbar from "./Navbar"; // Import Navbar
import Home from "./Home";
import MovieDetails from "./MovieDetails";
import Series from "./Series";
import Movies from "./Movies";

function App() {
  return (
    <Router>
      <Navbar /> {/* This should show the Navbar */}
      <div className="App">
        <Routes> {/* Routes instead of Switch in v6 */}
          <Route path="/" element={<Home />} /> 
          <Route path="/series" element={<Series/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/movieDetails/:imdbID" element={<MovieDetails/>}/>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;

