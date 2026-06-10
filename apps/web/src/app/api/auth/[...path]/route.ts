import { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL!;

async function handler(
  request: NextRequest,
  context: {
    params: Promise<{
      path: string[];
    }>;
  },
) {
  const { path } = await context.params;

  const target = `${API_URL}/api/auth/${path.join('/')}`;

  const response = await fetch(target, {
    method: request.method,

    headers: request.headers,

    body: request.method === 'GET' ? undefined : await request.text(),
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
    headers,
  });
}

export { handler as GET, handler as POST };
