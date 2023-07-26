"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const Header = () => {

    const socket = io(process.env.NEXT_PUBLIC_API_URL);

    // Main movie picture
    const [movieUrl, setMovieUrl] = useState("");
    // Random film to find by the user
    const [randomMovieName, setRandomMovieName] = useState();
    // User result
    const [userAnswer, setUserAnswer] = useState("");
    // Match between film to find and user result, null at initialization and bollean after a first try
    const [matchResult, setMatchResult] = useState(null);
    // Others basic requests
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const baseURL = "https://api.themoviedb.org/3";
    const requestFilm = baseURL + "/trending/all/week?api_key=" + apiKey + "&language=en-US";
    const [randomZoomPosition, setRandomZoomPosition] = useState({ x: 0, y: 0 });

    // Others requests disponible
    // fetchTopRated: baseURL + "/movie/top_rated?api_key=" + apiKey + "&language=en-US"
    // fetchActionMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=28"
    // fetchComedyMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=35"
    // fetchHorrorMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=27"
    // fetchRomanceMovies: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=10749"
    // fetchDocumentaries: baseURL + "/discover/movie?api_key=" + apiKey + "&with_genres=99"
    
    useEffect(() => {
        socket.on("new-film-url", (url) => {
            setRandomZoomPosition(getRandomPosition());
            setMovieUrl(url);
        });

        socket.on("new-film-name", (filmName) => {
            setRandomMovieName(filmName);
            setMatchResult(null);
        });
    }, []);

    // Function to generate random X and Y position
    const getRandomPosition = () => {
      
        const randomX = Math.floor(Math.random() * 51);
        const randomY = Math.floor(Math.random() * 51);

        setRandomZoomPosition({ x: -randomX, y: -randomY });
      
        return { x: -randomX, y: -randomY };
      };
    

    const filmFinder = async () => {
        try {
            const response = await axios.request(requestFilm);
    
            // Select a random movie from the movies array
            const randomIndex = Math.floor(Math.random() * response.data.results.length);
            const selectedMovie = response.data.results[randomIndex];

            // Send the new url film name to the socket
            socket.emit("new-film-name", (selectedMovie));

            // Send the new url film picture to the socket
            socket.emit("new-film-url", `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`);

            console.log("The film is : ", selectedMovie.name ? selectedMovie.name : selectedMovie.title);
        } catch (error) {
            console.error(error);
        }

    };

    // Compare film to find and user result
    const testMatchingResult = () => {

        if (userAnswer == randomMovieName) {
            setMatchResult("IT IS GOOD !");
        } else {
            setMatchResult("WROOONG !");
        }

    };
    
    return (
  <div className=" flex justify-center flex-col items-center gap-5 py-3">
        <button className="bg-gray-800 px-3" onClick={filmFinder}>Toggle a new film to find</button>
            {randomMovieName && movieUrl ? (
                <div className="film-square bg-red-700">
                    <img
                        src={movieUrl}
                        alt="film to find"
                        className="film-img"
                        style={{ transform: `scale(2) translate(${randomZoomPosition.x}%, ${randomZoomPosition.y}%)` }}
                    />
                </div>
        ) : (
        <h3>No film to find</h3>
        )}
        
        <input type="text" placeholder="Enter a name" className="text-black" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}/>
        <div className="flex gap-5">
            <button className="bg-gray-800 px-3" onClick={testMatchingResult}>TEST</button>
            {/* Only show the message if the matchResult isn't null */}
            {matchResult !== undefined && (          
                matchResult === "IT IS GOOD !" ?
                <span className="bg-green-600">{matchResult}</span> :
                <span className="bg-red-700">{matchResult}</span>
            )}
        </div>
  </div>
);

};

export default Header;
