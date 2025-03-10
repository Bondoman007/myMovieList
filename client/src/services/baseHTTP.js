import axios from "axios";

export const baseHTTP = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzY2OTlmMGQwNzllOTdkNWY4MDE3NzEyOTMxZThkNiIsIm5iZiI6MTczNzU1NzIwNi42NjQsInN1YiI6IjY3OTEwNGQ2YTNjN2Q3OTQ3MmUwMDNjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f5F_doNc5o2H_Li1dbpbjzJV_CtMrTw-bBf-nUaB6ok",
  },
  params: {
    language: "en-US",
  },
});
