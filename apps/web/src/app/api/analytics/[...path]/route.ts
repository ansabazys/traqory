import { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL!;

async function handler(
  request: NextRequest,
  context: {
    params: Promise<{
      path: string[];
    }>;
  },
) {
  const { path } = await context.params;

  const target = `${API_URL}/${path.join('/')}`;

  const response = await fetch(target, {
    method: request.method,

    headers: request.headers,

    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.text(),
  });

  const headers = new Headers();

  response.headers.forEach((value, key) => {
    const lower = key.toLowerCase();

    if (
      lower === 'content-encoding' ||
      lower === 'content-length' ||
      lower === 'transfer-encoding'
    ) {
      return;
    }

    headers.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
