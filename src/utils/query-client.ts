import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { log } from '@/utils/browser-logger';

// Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 429
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          if (
            error?.response?.status === 408 ||
            error?.response?.status === 429
          ) {
            return failureCount < 2;
          }
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Don't retry mutations on 4xx errors
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 1; // Only retry once for mutations
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      // Log query errors
      log.error('React Query Error', {
        queryKey: query.queryKey,
        error: error.message,
        status: error?.response?.status,
      });
    },
    onSuccess: (data, query) => {
      // Log successful queries in debug mode
      log.debug('React Query Success', {
        queryKey: query.queryKey,
        dataType: typeof data,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any, variables, context, mutation) => {
      // Log mutation errors
      // log.error('React Query Mutation Error', {
      //   mutationKey: mutation.options.mutationKey,
      //   error: error.message,
      //   status: error?.response?.status,
      //   variables,
      // });
    },
    onSuccess: (data, variables, context, mutation) => {
      // Log successful mutations
      log.info('React Query Mutation Success', {
        mutationKey: mutation.options.mutationKey,
        dataType: typeof data,
      });
    },
  }),
});

// Query keys factory for better organization
export const queryKeys = {
  // Auth
  auth: {
    user: () => ['auth', 'user'] as const,
    logout: () => ['logout'] as const,
    profile: (userId: string) => ['auth', 'profile', userId] as const,
  },

  // Users
  users: {
    all: () => ['users'] as const,
    lists: () => [...queryKeys.users.all(), 'list'] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all(), 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
};

// Utility functions for cache management
export const queryUtils = {
  // Invalidate all queries for a specific entity
  invalidateEntity: (entity: string) => {
    queryClient.invalidateQueries({ queryKey: [entity] });
  },

  // Clear all cache
  clearCache: () => {
    queryClient.clear();
  },

  // Prefetch data
  prefetch: <T>(queryKey: readonly unknown[], queryFn: () => Promise<T>) => {
    return queryClient.prefetchQuery({
      queryKey,
      queryFn,
    });
  },

  // Set query data manually
  setQueryData: <T>(queryKey: readonly unknown[], data: T) => {
    queryClient.setQueryData(queryKey, data);
  },

  // Get cached data
  getQueryData: <T>(queryKey: readonly unknown[]): T | undefined => {
    return queryClient.getQueryData(queryKey);
  },
};
