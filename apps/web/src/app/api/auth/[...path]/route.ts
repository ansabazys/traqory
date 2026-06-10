import { NextRequest } from 'next/server';

const AUTH_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL!;

async function handler(
  request: NextRequest,
  context: {
    params: Promise<{
      path: string[];
    }>;
  },
) {
  const { path } =
    await context.params;

  const target =
    `${AUTH_URL}/api/auth/${path.join('/')}`;

  const response = await fetch(
    target,
    {
      method: request.method,

      headers: request.headers,

      body:
        request.method === 'GET'
          ? undefined
          : await request.text(),
    },
  );

  const body =
    await response.text();

  const nextResponse =
    new Response(body, {
      status: response.status,
    });

  response.headers.forEach(
    (value, key) => {
      nextResponse.headers.set(
        key,
        value,
      );
    },
  );

  return nextResponse;
}

export {
  handler as GET,
  handler as POST,
};