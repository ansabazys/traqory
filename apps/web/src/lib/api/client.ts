import { fetcher } from './fetcher';

function createApiClient(baseUrl: string) {
  return {
    get: <T>(path: string) => fetcher<T>(`${baseUrl}${path}`),

    post: <T>(path: string, body: unknown) =>
      fetcher<T>(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }),

    put: <T>(path: string, body: unknown) =>
      fetcher<T>(`${baseUrl}${path}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }),

    delete: <T>(path: string) =>
      fetcher<T>(`${baseUrl}${path}`, {
        method: 'DELETE',
      }),
    patch: <T>(path: string, body: unknown) =>
      fetcher<T>(`${baseUrl}${path}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }),
  };
}

export const authApi = createApiClient('/api/auth');

export const websiteApi = createApiClient('/api/analytics');

export const analyticsApi = createApiClient('/api/analytics');
