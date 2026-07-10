"use client";

import { useCallback, useState } from 'react';
import { movieUrl } from '@/lib/urls';

interface ShareButtonsProps {
  id: number;
  title: string;
}

export default function ShareButtons({ id, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const full = movieUrl(id);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore
    }
  }, [full]);

  return (
    <div className="flex items-center gap-3">
      <a
        href={full}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100"
      >
        打开链接
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100"
      >
        {copied ? '已复制' : '复制链接'}
      </button>
    </div>
  );
}
