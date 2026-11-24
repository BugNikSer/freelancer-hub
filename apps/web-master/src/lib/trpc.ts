import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@repo/api/trpc';

export const trpc = createTRPCReact<AppRouter>();

const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${apiURL}/trpc`,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});
