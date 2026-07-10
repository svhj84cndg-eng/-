import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMovieById } from '@/lib/movies';
import { MovieDetail } from '@/components/MovieDetail';

type RouteProps = any;

export async function generateMetadata(props: RouteProps): Promise<Metadata> {
  const { params } = props as { params: { id: string } | Promise<{ id: string }> };
  const { id } = (await params) as { id: string };
  const movie = await getMovieById(Number(id));

  const title = movie ? `${movie.title} · 影片详情` : '电影详情';
  const description = movie ? `查看 ${movie.title} 的完整信息与评分。` : '电影详情页面';
  const host = process.env.NEXT_PUBLIC_SITE_URL;
  const url = movie && host ? `${host.replace(/\/$/, '')}/movie/${id}` : undefined;

  const metadata: Metadata = {
    title,
    description,
  };

  if (movie) {
    metadata.openGraph = {
      title,
      description,
      images: [{ url: movie.poster, alt: movie.title }],
      ...(url ? { url } : {}),
    };
  }

  if (url) {
    metadata.alternates = { canonical: url };
  }

  return metadata;

}

export default async function MoviePage(props: any) {
  const { params } = props as { params: { id: string } | Promise<{ id: string }> };
  const { id } = (await params) as { id: string };
  const movie = await getMovieById(Number(id));

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
      <div className="border-b border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">电影详情</p>
              <h1 className="text-2xl font-semibold text-gray-950 dark:text-white">{movie.title}</h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">点击返回首页查看更多经典电影</p>
          </div>
        </div>
      </div>

      <MovieDetail movie={movie} />
    </main>
  );
}
