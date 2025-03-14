import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseHTTP } from "../../services/baseHTTP";

const createArrayFromRawData = async (rawData, moviesArray, genres) => {
  rawData.map((movie) => {
    const movieGenres = movie.genre_ids.map((id) =>
      genres.find((genre) => genre.id === id)
    );
    if (movie.backdrop_path) {
      moviesArray.push({
        ...movie,
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.map((genre) => genre?.name),
      });
    }
  });
  return moviesArray;
};

// Axios instance with Bearer token authentication

// Fetch genres
export const getGenres = createAsyncThunk("movie/getGenres", async () => {
  const response = await baseHTTP.get("genre/movie/list", {
    params: { language: "en-US" },
  });
  return response.data.genres;
});

// Fetch movie trailer
export const getMovieTrailer = createAsyncThunk(
  "movie/trailer",
  async (movie) => {
    const type = movie?.media_type ? movie.media_type : "movie";
    const response = await baseHTTP.get(`${type}/${movie.id}/videos`);
    const result = response?.data.results.find(
      (video) => video.type === "Trailer"
    );
    return result?.key;
  }
);

// Fetch movies by genre
export const fetchMoviesWithGenre = createAsyncThunk(
  "movie/genre",
  async ({ genre, type }, thunkAPI) => {
    const { genres } = thunkAPI.getState().movie;
    const moviesArray = [];

    for (let i = 1; moviesArray.length < 60 && i <= 20; i++) {
      const response = await baseHTTP.get(`discover/${type}`, {
        params: { page: i, language: "en-US", with_genres: genre },
      });
      createArrayFromRawData(response.data.results, moviesArray, genres);
    }

    return moviesArray;
  }
);

// Fetch trending movies
export const fetchMovies = createAsyncThunk(
  "movie/trending",
  async ({ type }, thunkAPI) => {
    const { genres } = thunkAPI.getState().movie;
    const moviesArray = [];

    for (let i = 1; moviesArray.length < 60 && i <= 10; i++) {
      const response = await baseHTTP.get(`trending/${type}/week`, {
        params: { page: i, language: "en-US" },
      });
      createArrayFromRawData(response.data.results, moviesArray, genres);
    }

    return moviesArray;
  }
);

// Fetch user liked movies
export const getUserLikedMovies = createAsyncThunk(
  "movie/liked",
  async (email) => {
    const response = await axios.get(
      `http://localhost:5000/api/users/liked/${email}`
    );
    return response.data.movies;
  }
);

// Remove liked movie
export const removeLikedMovie = createAsyncThunk(
  "movie/removeLiked",
  async ({ email, movie }) => {
    const response = await axios.put("http://localhost:5000/api/users/remove", {
      email,
      movie,
    });
    return response.data.movies;
  }
);

// Search movies
export const searchMovies = createAsyncThunk(
  "movie/search",
  async ({ query }, thunkAPI) => {
    const { genres } = thunkAPI.getState().movie;
    const moviesArray = [];

    const response = await baseHTTP.get("search/movie", {
      params: { language: "en-US", query },
    });

    createArrayFromRawData(response.data.results, moviesArray, genres);
    return moviesArray;
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    genres: [],
    genresLoaded: false,
    status: "idle",
    trailer: "",
    LikedMovies: [],
    searchedMovies: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    }),
      builder.addCase(fetchMovies.pending, (state, action) => {
        state.status = "pending";
      }),
      builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = "succeeded";
      }),
      builder.addCase(getMovieTrailer.fulfilled, (state, action) => {
        state.trailer = action.payload;
      }),
      builder.addCase(fetchMoviesWithGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = "succeeded";
      }),
      builder.addCase(fetchMoviesWithGenre.pending, (state, action) => {
        state.status = "pending";
      }),
      builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
        state.LikedMovies = action.payload;
        state.status = "succeeded";
      }),
      builder.addCase(getUserLikedMovies.pending, (state, action) => {
        state.status = "pending";
      }),
      builder.addCase(searchMovies.fulfilled, (state, action) => {
        state.searchedMovies = action.payload;
        state.status = "succeeded";
      }),
      builder.addCase(removeLikedMovie.pending, (state, action) => {
        state.status = "pending";
      }),
      builder.addCase(removeLikedMovie.fulfilled, (state, action) => {
        state.LikedMovies = action.payload;
        state.status = "succeeded";
      });
  },
});

export default movieSlice.reducer;
