import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadNotices() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/notices');

      if (!response.ok) {
        throw new Error('Unable to load notices right now.');
      }

      const data = await response.json();
      setNotices(data);
    } catch (error) {
      setError(error.message || 'Something went wrong while loading notices.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotices();
  }, []);

  const filteredNotices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return notices;

    return notices.filter((notice) => {
      const title = notice.title?.toLowerCase() || '';
      const body = notice.body?.toLowerCase() || '';
      const category = notice.category?.toLowerCase() || '';
      const priority = notice.priority?.toLowerCase() || '';

      return (
        title.includes(query) ||
        body.includes(query) ||
        category.includes(query) ||
        priority.includes(query)
      );
    });
  }, [notices, searchTerm]);

  async function deleteNotice(id) {
    const confirmed = window.confirm(
      'Delete this notice permanently? This action cannot be undone.'
    );

    if (!confirmed) return;

    const response = await fetch(`/api/notices/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setNotices((currentNotices) =>
        currentNotices.filter((notice) => notice.id !== id)
      );
      return;
    }

    alert('Could not delete this notice. Please try again.');
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                Reno Campus Portal
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Campus Notice Board
              </h1>

              <p className="mt-2 text-gray-600">
                Keep exam, event and general announcements organised in one
                place.
              </p>
            </div>

            <Link
              href="/add"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-center font-semibold text-white hover:bg-indigo-700"
            >
              Publish Notice
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title, category or priority..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
            />

            <p className="text-sm font-medium text-gray-500">
              {notices.length} {notices.length === 1 ? 'notice' : 'notices'}{' '}
              published
            </p>
          </div>
        </div>

        {loading && (
          <p className="rounded-xl bg-white p-5 text-center text-gray-600 shadow-sm">
            Loading latest notices...
          </p>
        )}

        {error && (
          <p className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p>
        )}

        {!loading && notices.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No notices published yet
            </h2>

            <p className="mt-2 text-gray-600">
              Create the first exam, event or general notice for the campus
              board.
            </p>

            <Link
              href="/add"
              className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Create First Notice
            </Link>
          </div>
        )}

        {!loading && notices.length > 0 && filteredNotices.length === 0 && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              No matching notices found
            </h2>

            <p className="mt-2 text-gray-600">
              Try searching with another title, category or priority.
            </p>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotices.map((notice) => (
            <article
              key={notice.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
            >
              {notice.image ? (
                <img
                  src={notice.image}
                  alt={notice.title}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="flex h-28 items-center justify-center bg-indigo-50 text-sm font-semibold text-indigo-700">
                  Campus Notice
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {notice.category}
                  </span>

                  {notice.priority === 'Urgent' && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                      Urgent
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900">
                  {notice.title}
                </h2>

                <p className="mt-3 line-clamp-4 flex-1 whitespace-pre-wrap text-gray-600">
                  {notice.body}
                </p>

                <p className="mt-4 text-sm font-medium text-gray-500">
                  Publishing Date: {formatDate(notice.publishDate)}
                </p>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/edit/${notice.id}`}
                    className="flex-1 rounded-lg border border-indigo-200 px-4 py-2 text-center font-semibold text-indigo-700 hover:bg-indigo-50"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteNotice(notice.id)}
                    className="flex-1 rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <footer className="mt-10 text-center text-sm text-gray-500">
          Campus Notice Board • Reno Web Development Assignment
        </footer>
      </section>
    </main>
  );
}