export async function validateApiKey(
  apiKey: string
) {
  if (apiKey === "trq_test") {
    return {
      id: "project_123",
      name: "Test Project",
    };
  }

  return null;
}