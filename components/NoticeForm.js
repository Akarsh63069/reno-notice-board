import Link from 'next/link';
import { useState } from 'react';

const emptyNotice = {
  title: '',
  body: '',
  category: 'General',
  priority: 'Normal',
  publishDate: new Date().toISOString().slice(0, 10),
  image: '',
};

export default function NoticeForm({ mode, initialNotice, onSubmit }) {
  const [values, setValues] = useState(initialNotice || emptyNotice);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const isEditMode = mode === 'edit';

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setErrors({});

    const result = await onSubmit(values);

    if (result) {
      setErrors(result);
    }

    setSaving(false);
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            ← Back to notice board
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Notice' : 'Create New Notice'}
          </h1>

          <p className="mt-2 text-gray-600">
            Add clear announcements for exams, events, and general updates.
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Fields marked with * are required and checked again on the server.
          </p>
        </div>

        {errors.form && (
          <p className="mb-4 rounded-xl bg-red-50 p-3 text-red-700">
            {errors.form}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="mb-2 block font-semibold text-gray-800"
              htmlFor="title"
            >
              Notice Title *
            </label>

            <input
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="e.g. Semester examination schedule"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              className="mb-2 block font-semibold text-gray-800"
              htmlFor="body"
            >
              Notice Details *
            </label>

            <textarea
              id="body"
              name="body"
              rows="6"
              value={values.body}
              onChange={handleChange}
              placeholder="Write the complete notice details here..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
            />

            {errors.body && (
              <p className="mt-1 text-sm text-red-600">{errors.body}</p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                className="mb-2 block font-semibold text-gray-800"
                htmlFor="category"
              >
                Notice Category
              </label>

              <select
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option value="Exam">Exam</option>
                <option value="Event">Event</option>
                <option value="General">General</option>
              </select>

              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label
                className="mb-2 block font-semibold text-gray-800"
                htmlFor="priority"
              >
                Priority Level
              </label>

              <select
                id="priority"
                name="priority"
                value={values.priority}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>

              {errors.priority && (
                <p className="mt-1 text-sm text-red-600">{errors.priority}</p>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                className="mb-2 block font-semibold text-gray-800"
                htmlFor="publishDate"
              >
                Publishing Date *
              </label>

              <input
                id="publishDate"
                type="date"
                name="publishDate"
                value={values.publishDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              />

              {errors.publishDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.publishDate}
                </p>
              )}
            </div>

            <div>
              <label
                className="mb-2 block font-semibold text-gray-800"
                htmlFor="image"
              >
                Image URL (optional)
              </label>

              <input
                id="image"
                name="image"
                value={values.image || ''}
                onChange={handleChange}
                placeholder="https://example.com/notice-banner.jpg"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              disabled={saving}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? 'Saving notice...'
                : isEditMode
                  ? 'Save Changes'
                  : 'Publish Notice'}
            </button>

            <Link
              href="/"
              className="rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}