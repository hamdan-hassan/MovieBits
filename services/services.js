/* eslint-disable prettier/prettier */
import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=ba239be43a612efafd2a49b49be6b9c4';
// Get Popular Movies
export const getPopularMovies = async (page) => {
    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}&page=${page}`);
    return resp.data.results;
};

export const getPopularTV = async (page) => {
    const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}&page=${page}`);
    return resp.data.results;
};

// Get Popular Movies
export const getTopRatedMovies = async (page) => {
    const resp = await axios.get(`${apiUrl}/movie/top_rated?${apiKey}&page=${page}`);
    return resp.data.results;
};

export const getTopRatedTV = async (page) => {
    const resp = await axios.get(`${apiUrl}/tv/top_rated?${apiKey}&page=${page}`);
    return resp.data.results;
};

export const getActionMovies = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/movie?${apiKey}&with_genres=28&page=${page}`,
    );
    return resp.data.results;
};

export const getActionTV = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/tv?${apiKey}&with_genres=10759&page=${page}`,
    );
    return resp.data.results;
};

export const getComedyMovies = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/movie?${apiKey}&with_genres=35&page=${page}`,
    );
    return resp.data.results;
};

export const getComedyTV = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/tv?${apiKey}&with_genres=35&page=${page}`,
    );
    return resp.data.results;
};

export const getAdventureMovies = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/movie?${apiKey}&with_genres=12&page=${page}`,
    );
    return resp.data.results;
};

export const getAnimationMovies = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/movie?${apiKey}&with_genres=16&page=${page}`,
    );
    return resp.data.results;
};

export const getAnimationTV = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/tv?${apiKey}&with_genres=16&page=${page}`,
    );
    return resp.data.results;
};

export const getCrimeTV = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/tv?${apiKey}&with_genres=80&page=${page}`,
    );
    return resp.data.results;
};



export const getDramaMovies = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/movie?${apiKey}&with_genres=18$page=${page}`,
    );
    return resp.data.results;
};

export const getDramaTV = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/tv?${apiKey}&with_genres=18&page=${page}`,
    );
    return resp.data.results;
};

export const getSciFiTV = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/tv?${apiKey}&with_genres=10765&page=${page}`,
    );
    return resp.data.results;
};

export const getMysteryTV = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/tv?${apiKey}&with_genres=9648$page${page}`,
    );
    return resp.data.results;
};

export const getDocumentaryTV = async () => {
    const resp = await axios.get(
        `${apiUrl}/discover/tv?${apiKey}&with_genres=99`,
    );
    return resp.data.results;
};

export const getRandomMovie = async () => {
    const randomNum = Math.floor((Math.random() * 499))
    const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}&page=${randomNum}`);
    return resp.data.results[0];
};

export const getRandomTV = async () => {
    const randomNum = Math.floor((Math.random() * 499))
    const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}&page=${randomNum}`);
    return resp.data.results[0];
};

export const getRomanticMovies = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/movie?${apiKey}&with_genres=10749&page=${page}`,
    );
    return resp.data.results;
};

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
    const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
    return resp.data.results;
};

// Get Popular TV


// Get Family Movies
export const getFamilyMovies = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/movie?${apiKey}&with_genres=10751&page=${page}`,
    );
    return resp.data.results;
};

export const getHorrorMovies = async (page) => {
    const resp = await axios.get(
        `${apiUrl}/discover/movie?${apiKey}&with_genres=27&page=${page}`,
    );
    return resp.data.results;
};

// Get Documnetery Movies
export const getDocumentaryMovies = async () => {
    const resp = await axios.get(
        `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
    );
    return resp.data.results;
};

// Get Trending Week
export const getTrendingWeekMovies = async () => {
    const resp = await axios.get(`${apiUrl}/trending/movie/week?${apiKey}`);
    return resp.data.results;
};

export const getTrendingWeekTV = async () => {
    const resp = await axios.get(`${apiUrl}/trending/tv/week?${apiKey}`);
    return resp.data.results;
};

export const getGenres = async (id, type) => {
    const resp = await axios.get(`${apiUrl}/${type}/${id}?${apiKey}`);
    return resp.data;
};

export const getVideos = async (id, type) => {
    const resp = await axios.get(`${apiUrl}/${type}/${id}/videos?${apiKey}`);
    return resp.data;
};

export const getCast = async (id, type) => {
    const resp = await axios.get(`${apiUrl}/${type}/${id}/credits?${apiKey}`);
    return resp.data;
};

// Search for Movie or TV by Keyword
export const searchMovieTv = async (query, type) => {
    const resp = await axios.get(
        `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
    );
    return resp.data.results;
};
