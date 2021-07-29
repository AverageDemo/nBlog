import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <header className="flex justify-between items-center py-10">
        <div>
          <Link href="/">
            <a aria-label="nBlog">
              {/* Your logo should go here */}
              <div className="text-4xl font-semibold text-green-400">nBlog</div>
            </a>
          </Link>
        </div>
      </header>
    </div>
  );
}
