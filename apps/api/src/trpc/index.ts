import { router, protectedProcedure, publicProcedure } from './trpc';
import { filesRouter } from './routers/files';

export const appRouter = router({
  health: publicProcedure.query(() => ({ status: 'ok' })),
  me: protectedProcedure.query(({ ctx }) => ({ user: ctx.user })),
  files: filesRouter,
});

export type AppRouter = typeof appRouter;
