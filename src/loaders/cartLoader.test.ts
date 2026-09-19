import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
import { cartLoader } from './cartLoader';
import * as cartApi from '@/api/cartApi';
import { Cart } from '@/types';

vi.mock('@/api/cartApi', () => ({
  fetchCartApi: vi.fn(),
}));

describe('cartLoader', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const mockCart: Cart = {
    id: 'cart-1',
    items: [],
    totalItems: 0,
    totalAmount: 0,
  };

  it('cartLoader pre-fetches active cart into queryClient', async () => {
    vi.mocked(cartApi.fetchCartApi).mockResolvedValue(mockCart);

    const loader = cartLoader(queryClient);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await loader({ request: new Request('http://localhost:5173/cart'), params: {} } as any);

    expect(cartApi.fetchCartApi).toHaveBeenCalled();
    expect(result).toEqual(mockCart);
  });
});
