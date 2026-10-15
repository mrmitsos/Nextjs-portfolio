import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-gray-700 dark:text-white/70">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-gray-900 px-7 py-3 text-white transition hover:bg-gray-950 dark:bg-white/10"
      >
        Back to home
      </Link>
    </div>
  );
}
