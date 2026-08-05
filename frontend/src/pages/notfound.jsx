import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-slate-50">
      <div className="max-w-md mx-auto px-4 text-center">
        {/* Large 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold bg-gradient-to-br from-primary-500 to-accent-500 bg-clip-text text-transparent tracking-tight">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-slate-900">Page Not Found</h2>

        <p className="mt-3 text-slate-500 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>

        <Link
          to="/"
          className="group inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold shadow-lg shadow-primary-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Go Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;