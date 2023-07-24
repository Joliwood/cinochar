"use client";
import React, { useState } from 'react';
import axios from 'axios';

const Header = () => {

    const [movieUrl, setMovieUrl] = useState("https://image.tmdb.org/t/p/original//39wmItIWsg5sZMyRUHLkWBcuVCM.jpg");
    const [movies, setMovies] = useState([]);
    const [randomMovie, setRandomMovie] = useState();
    // const apiKey = process.env.TMDB_API_KEY;
    const apiKey = process.env.TMDB_API_KEY;
    const baseURL = "https://api.themoviedb.org/3";
    // const base_url_image = "https://image.tmdb.org/t/p/original/";
    const requests = {
        fetchTrending: baseURL + "/trending/all/week?api_key=" + apiKey + "&language=en-US",
        fetchTopRated: baseURL + "/movie/top_rated?api_key=" + apiKey + "&language=en-US",
        fetchActionMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=28",
        fetchComedyMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=35",
        fetchHorrorMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=27",
        fetchRomanceMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=10749",
        fetchDocumentaries: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=99",
    };
    const [findResult, setFindResult] = useState(null);

      const filmFinder = async () => {
        try {
            const response = await axios.request(requests.fetchTrending);
            setMovies(response.data.results);
            // console.log(movies);
    
            // Select a random movie from the movies array
            const randomIndex = Math.floor(Math.random() * response.data.results.length);
            const selectedMovie = response.data.results[randomIndex];
            setRandomMovie(selectedMovie)
    
            // Update the movieUrl and display the selected movie's title
            setMovieUrl(`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`);
            // console.log("Randomly selected movie title: ", selectedMovie.name ? selectedMovie.name : selectedMovie.title);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        
        <div className="bg-gray-500 flex justify-center flex-col items-center gap-5 py-3">
            <button className="bg-blue-700 px-3" onClick={filmFinder}>Toggle a new film to find</button>
            {randomMovie && randomMovie.poster_path ? (
                <>
                    <h3>{randomMovie.name ? randomMovie.name : randomMovie.title}</h3>
                    <img src={movieUrl} alt="film to find" className="max-w-[200px]" />
                </>
                ) : <h3>No film to find</h3>
            }
            
            <input type="text" placeholder="Enter a name" className="text-black" value={findResult} onChange={(e) => setFindResult(e.target.value)}/>
            <div className="flex gap-5">
                <button className="bg-green-700 px-3">TEST</button>
                {randomMovie && randomMovie.name ? (
    findResult === randomMovie.name ? <span>IT IS GOOD !</span> : (findResult === null ? <span>TRY IT</span> : <span>WROOONG !</span>)
) : (
    findResult === randomMovie?.title ? <span>IT IS GOOD !</span> : (findResult === null ? <span>TRY IT</span> : <span>WROOONG !</span>)
)}


                

            </div>
            <div className="bg-red-400 px-3">
                <h3>Liste of films</h3>
                <ul>
                    {movies.map((movie, index) => (
                        <li key={index}>{movie.name ? movie.name : movie.title} -{'>'} id : {movie.id}</li>
                    ))}
                </ul>
            </div>
        </div>
  );
};

export default Header;
