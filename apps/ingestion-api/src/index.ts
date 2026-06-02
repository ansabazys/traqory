import Fastify from 'fastify';
import { env } from './env';

const app = Fastify();


app.get('/health', async () => {
  return {
    status: 'ok',
  };
});

app.listen({
  port: env.INGESTION_API_PORT,
});