import { NextRequest } from 'next/server';

const API_URL =
  process.env.NEXT_PUBLIC_ANALYTICS_API_URL!;

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
    `${API_URL}/${path.join('/')}`;

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
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};