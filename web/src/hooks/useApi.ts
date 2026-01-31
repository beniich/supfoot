import { useState, useEffect, useCallback } from 'react';

// ============================================
// Custom Hook for API Calls with State Management
// ============================================

interface UseApiOptions<T> {
    initialData?: T;
    autoFetch?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
}

interface UseApiReturn<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    reset: () => void;
}

export function useApi<T>(
    apiFunction: () => Promise<T>,
    options: UseApiOptions<T> = {}
): UseApiReturn<T> {
    const { initialData = null, autoFetch = true, onSuccess, onError } = options;

    const [data, setData] = useState<T | null>(initialData);
    const [loading, setLoading] = useState<boolean>(autoFetch);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await apiFunction();
            setData(result);
            onSuccess?.(result);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('An error occurred');
            setError(error);
            onError?.(error);
        } finally {
            setLoading(false);
        }
    }, [apiFunction, onSuccess, onError]);

    const reset = useCallback(() => {
        setData(initialData);
        setError(null);
        setLoading(false);
    }, [initialData]);

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [autoFetch, fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
        reset,
    };
}

// ============================================
// Custom Hook for Mutations (POST, PUT, DELETE)
// ============================================

interface UseMutationReturn<TData, TVariables> {
    data: TData | null;
    loading: boolean;
    error: Error | null;
    mutate: (variables: TVariables) => Promise<TData | null>;
    reset: () => void;
}

export function useMutation<TData, TVariables>(
    mutationFunction: (variables: TVariables) => Promise<TData>,
    options: {
        onSuccess?: (data: TData) => void;
        onError?: (error: Error) => void;
    } = {}
): UseMutationReturn<TData, TVariables> {
    const { onSuccess, onError } = options;

    const [data, setData] = useState<TData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = useCallback(
        async (variables: TVariables): Promise<TData | null> => {
            setLoading(true);
            setError(null);

            try {
                const result = await mutationFunction(variables);
                setData(result);
                onSuccess?.(result);
                return result;
            } catch (err) {
                const error = err instanceof Error ? err : new Error('An error occurred');
                setError(error);
                onError?.(error);
                return null;
            } finally {
                setLoading(false);
            }
        },
        [mutationFunction, onSuccess, onError]
    );

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return {
        data,
        loading,
        error,
        mutate,
        reset,
    };
}

// ============================================
// Custom Hook for Paginated Data
// ============================================

interface UsePaginatedApiOptions<T> {
    initialPage?: number;
    pageSize?: number;
    onSuccess?: (data: T[]) => void;
    onError?: (error: Error) => void;
}

interface UsePaginatedApiReturn<T> {
    data: T[];
    loading: boolean;
    error: Error | null;
    page: number;
    hasMore: boolean;
    loadMore: () => Promise<void>;
    refetch: () => Promise<void>;
    reset: () => void;
}

export function usePaginatedApi<T>(
    apiFunction: (page: number, pageSize: number) => Promise<{ data: T[]; hasMore: boolean }>,
    options: UsePaginatedApiOptions<T> = {}
): UsePaginatedApiReturn<T> {
    const { initialPage = 1, pageSize = 20, onSuccess, onError } = options;

    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [page, setPage] = useState<number>(initialPage);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchData = useCallback(
        async (pageNum: number, append = false) => {
            setLoading(true);
            setError(null);

            try {
                const result = await apiFunction(pageNum, pageSize);
                setData((prev) => (append ? [...prev, ...result.data] : result.data));
                setHasMore(result.hasMore);
                onSuccess?.(result.data);
            } catch (err) {
                const error = err instanceof Error ? err : new Error('An error occurred');
                setError(error);
                onError?.(error);
            } finally {
                setLoading(false);
            }
        },
        [apiFunction, pageSize, onSuccess, onError]
    );

    const loadMore = useCallback(async () => {
        if (!loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            await fetchData(nextPage, true);
        }
    }, [loading, hasMore, page, fetchData]);

    const refetch = useCallback(async () => {
        setPage(initialPage);
        await fetchData(initialPage, false);
    }, [initialPage, fetchData]);

    const reset = useCallback(() => {
        setData([]);
        setError(null);
        setLoading(false);
        setPage(initialPage);
        setHasMore(true);
    }, [initialPage]);

    useEffect(() => {
        fetchData(initialPage, false);
    }, []);

    return {
        data,
        loading,
        error,
        page,
        hasMore,
        loadMore,
        refetch,
        reset,
    };
}

// ============================================
// Custom Hook for Local Storage
// ============================================

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);

                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            } catch (error) {
                console.error(`Error setting localStorage key "${key}":`, error);
            }
        },
        [key, storedValue]
    );

    const removeValue = useCallback(() => {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue] as const;
}

// ============================================
// Custom Hook for Debounced Value
// ============================================

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
