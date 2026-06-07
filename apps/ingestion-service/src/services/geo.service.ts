export async function getGeo(ip: string) {
  try {
    const response = await fetch(
      `http://ip-api.com/json/${ip}`,
    );

    const data = await response.json();

    return {
      country: data.country ?? null,
      region: data.regionName ?? null,
      city: data.city ?? null,
      latitude: data.lat ?? null,
      longitude: data.lon ?? null,
    };
  } catch {
    return {
      country: null,
      region: null,
      city: null,
      latitude: null,
      longitude: null,
    };
  }
}