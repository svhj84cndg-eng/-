"use client";

import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/lib/types";
import { moviePath } from '@/lib/urls';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      href={moviePath(movie.id)}
      className="group block bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg line-clamp-1 mb-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{movie.originalTitle}</p>

        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 text-amber-500 font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {movie.rating.toFixed(1)}
          </span>
          <span className="text-gray-500 dark:text-gray-400">{movie.year}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {movie.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
