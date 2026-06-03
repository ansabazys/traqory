import { app } from './app.js';
import { env } from './config/env.js';

app.listen({
  port: Number(env.PORT),
  host: '0.0.0.0',
});
