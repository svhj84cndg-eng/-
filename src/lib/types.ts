export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  year: number;
  director: string;
  genres: string[];
  rating: number;
  poster: string;
  description: string;
  runtime: number;
  country: string;
  language: string;
  cast?: string[];
}

export interface MovieCardProps {
  movie: Movie;
}