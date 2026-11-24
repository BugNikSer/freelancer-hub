import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { trpcServer } from '@hono/trpc-server';
import { auth } from './lib/auth';
import { appRouter } from './trpc';
import { createContext } from './trpc/trpc';
import 'dotenv/config';

const app = new Hono();

app.use('*', logger());

app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:8081'],
    allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'Set-Cookie'],
    maxAge: 600,
    credentials: true,
  })
);

// Эндпоинты Better-Auth (/api/auth/sign-in, /api/auth/sign-up и т.д.)
app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

// Эндпоинты tRPC (/trpc/*)
app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: (_opts, c) => createContext({ headers: c.req.raw.headers }),
  })
);

const port = Number(process.env.PORT) || 3000;
console.log(`API server running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
