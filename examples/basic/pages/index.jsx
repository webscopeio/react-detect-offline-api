import { useHealthCheck } from '@webscopeio/react-health-check';
import { toast } from 'react-toastify';

export default function Home() {
  const { available } = useHealthCheck({
    service: {
      name: 'auth',
      url: '/api/health',
    },
    onSuccess: ({ service, since }) => {
      toast.success(
        <>
          Service <strong>"{service.name}"</strong> is available since: <br />{' '}
          {Date(since).toString()} 🎉
        </>,
      );
    },
    onError: ({ service, since }) => {
      toast.error(
        <>
          Service <strong>"{service.name}"</strong> is not available since: <br />{' '}
          {Date(since).toString()} 😔
        </>,
      );
    },
    refreshInterval: 2000,
  });

  return (
    <div class="container">
      <div class="health-wrapper">
        <p>Service health: </p>
        <span class={`availability ${available ? 'is-available' : ''}`}>
          {available ? 'Available' : 'Not available'}
        </span>
      </div>
      <div class="button-wrapper">
        <button type="button" onClick={() => fetch('/api/toggle')}>
          Toggle service health
        </button>
      </div>

      <p class="author">
        Made with ❤️ by{' '}
        <a href="https://webscope.io" target="_blank" rel="noopener noreferrer">
          Webscope.io
        </a>
      </p>
    </div>
  );
}
