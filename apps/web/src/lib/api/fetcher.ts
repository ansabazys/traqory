export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(
    input,
    {
      ...init,
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(
      await response.text(),
    );
  }

  return response.json();
}