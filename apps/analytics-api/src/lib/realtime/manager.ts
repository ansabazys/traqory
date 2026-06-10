const clients = new Map<string, Set<NodeJS.WritableStream>>();

export function addClient(websiteId: string, stream: NodeJS.WritableStream) {
  if (!clients.has(websiteId)) {
    clients.set(websiteId, new Set());
  }

  clients.get(websiteId)!.add(stream);
}

export function removeClient(websiteId: string, stream: NodeJS.WritableStream) {
  clients.get(websiteId)?.delete(stream);
}

export function broadcast(websiteId: string, payload: unknown) {
  console.log('Broadcasting', websiteId, payload);
  const connections = clients.get(websiteId);

  if (!connections) return;

  const message = `data: ${JSON.stringify(payload)}\n\n`;

  for (const client of connections) {
    client.write(message);
  }
}
