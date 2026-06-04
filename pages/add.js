import { useRouter } from 'next/router';
import NoticeForm from '../components/NoticeForm';

export default function AddNotice() {
  const router = useRouter();

  async function handleSubmit(values) {
    try {
      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return (
          data.errors || {
            form: data.message || 'Unable to publish notice.',
          }
        );
      }

      router.push('/');
      return null;
    } catch (error) {
      return {
        form: 'Unable to connect to the server. Please try again.',
      };
    }
  }

  return <NoticeForm mode="add" onSubmit={handleSubmit} />;
}