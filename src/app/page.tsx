import { Metadata } from 'next';
import { getMovies } from '@/lib/movies';
import { MovieGrid } from '@/components/MovieGrid';
import { Search } from '@/components/Search';
import { filterMovies } from '@/lib/movies';

export const metadata: Metadata = {
  title: '经典电影浏览',
  description: '发现并探索经典电影',
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const movies = await getMovies();
  const filteredMovies = filterMovies(movies, q || '');

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between h-20 md:h-24">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">经典电影浏览</p>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">发现值得收藏的电影</h1>
            </div>
            <Search initialValue={q || ''} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {(q || filteredMovies.length !== movies.length) && (
          <div className="mb-6 flex items-center gap-2">
            <p className="text-gray-600 dark:text-gray-300">
              找到 <span className="font-semibold text-gray-900 dark:text-white">{filteredMovies.length}</span> 部电影
              {q && (
                <>
                  <span className="text-gray-400">/</span> 共 {movies.length} 部
                </>
              )}
            </p>
            {q && (
              <a
                href="/"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                清除搜索
              </a>
            )}
          </div>
        )}

        <MovieGrid movies={filteredMovies} />
      </div>

      <footer className="border-t border-gray-100 dark:border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          数据来源：电影公开信息
        </div>
      </footer>
    </main>
  );
}