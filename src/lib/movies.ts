import fs from 'fs';
import path from 'path';
import { Movie } from '@/lib/types';

const downloadsMovieFile = path.join(process.env.HOME || '', 'Downloads', 'movies.json');
const fallbackMovieFile = path.join(process.cwd(), 'public', 'movies.json');

function readMovieFile(filePath: string): Movie[] {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw) as Movie[];
}

export async function getMovies(): Promise<Movie[]> {
  const sourceFile = fs.existsSync(downloadsMovieFile) ? downloadsMovieFile : fallbackMovieFile;
  return readMovieFile(sourceFile);
}

export function filterMovies(movies: Movie[], query: string): Movie[] {
  const q = query.toLowerCase().trim();
  if (!q) return movies;
  return movies.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.originalTitle.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q) ||
      m.genres.some((g) => g.toLowerCase().includes(q))
  );
}

export async function getMovieById(id: number): Promise<Movie | undefined> {
  const movies = await getMovies();
  return movies.find((m) => m.id === id);
}
