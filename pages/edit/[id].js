import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NoticeForm from '../../components/NoticeForm';

function formatDateForInput(date) {
  return new Date(date).toISOString().slice(0, 10);
}

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    async function loadNotice() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/notices/${id}`);

        if (!response.ok) {
          throw new Error('This notice could not be found.');
        }

        const data = await response.json();

        setNotice({
          title: data.title,
          body: data.body,
          category: data.category,
          priority: data.priority,
          publishDate: formatDateForInput(data.publishDate),
          image: data.image || '',
        });
      } catch (error) {
        setError(error.message || 'Unable to load this notice.');
      } finally {
        setLoading(false);
      }
    }

    loadNotice();
  }, [id]);

  async function handleSubmit(values) {
    const response = await fetch(`/api/notices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return data.errors || { form: data.message || 'Unable to update notice.' };
    }

    router.push('/');
    return null;
  }

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-10 text-center text-gray-600">
        Loading notice details...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen px-4 py-10 text-center text-red-600">
        {error}
      </main>
    );
  }

  return (
    <NoticeForm
      mode="edit"
      initialNotice={notice}
      onSubmit={handleSubmit}
    />
  );
}