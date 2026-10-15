"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-3 text-gray-700 dark:text-white/70">
        The page couldn&apos;t be loaded. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-gray-900 px-7 py-3 text-white transition hover:bg-gray-950 dark:bg-white/10"
      >
        Try again
      </button>
    </div>
  );
}
