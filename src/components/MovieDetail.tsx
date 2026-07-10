import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/lib/types';
import ShareButtons from './ShareButtons';

interface MovieDetailProps {
  movie: Movie;
}

export function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="relative w-full lg:w-1/3 overflow-hidden rounded-[28px] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
          <div className="aspect-[2/3] relative">
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3 items-center text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">{movie.year}</span>
              <span>·</span>
              <span>{movie.director}</span>
              <span>·</span>
              <span>{movie.runtime} 分钟</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-950 dark:text-white">{movie.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{movie.originalTitle}</p>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span key={genre} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">评分</p>
              <p className="mt-3 text-3xl font-semibold text-amber-500">{movie.rating.toFixed(1)}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">国家 / 语言</p>
              <p className="mt-3 text-base text-gray-900 dark:text-white">{movie.country}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{movie.language}</p>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">剧情简介</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-8">{movie.description}</p>
          </div>

          {movie.cast?.length ? (
            <div className="space-y-3 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">演员阵容</h2>
              <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
                {movie.cast.map((actor) => (
                  <span key={actor} className="px-3 py-2 rounded-2xl bg-gray-100 dark:bg-gray-800">{actor}</span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <ShareButtons id={movie.id} title={movie.title} />

            <Link href="/" className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-5 py-3 text-sm font-medium transition hover:bg-gray-700">
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
