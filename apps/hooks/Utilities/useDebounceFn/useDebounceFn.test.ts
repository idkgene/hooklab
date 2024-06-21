import { renderHook, act } from '@testing-library/react';
import useDebounceFn from './useDebounceFn';

jest.useFakeTimers();

describe('useDebounceFn', () => {
  const callback = jest.fn();

  beforeEach(() => {
    callback.mockClear();
  });

  it('should debounce the function execution', async () => {
    const { result } = renderHook(() => useDebounceFn(callback, 200));
    const debouncedFn = result.current;

    await act(async () => {
      debouncedFn();
      debouncedFn();
      debouncedFn();
    });

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to te debounced function', async () => {
    const { result } = renderHook(() => useDebounceFn(callback, 200));
    const debouncedFn = result.current;

    await act(async () => {
      debouncedFn('arg1', 'arg2');
    });

    jest.advanceTimersByTime(200);
    await Promise.resolve();

    expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should respect the maxWait option', async () => {
    const { result } = renderHook(() =>
      useDebounceFn(callback, 200, { maxWait: 100 })
    );
    const debouncedFn = result.current;

    await act(async () => {
      debouncedFn();
    });

    jest.advanceTimersByTime(100);
    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should reject the promise when rejectOnCancel is true', async () => {
    const { result } = renderHook(() =>
      useDebounceFn(callback, 200, { rejectOnCancel: true })
    );
    const debouncedFn = result.current;

    const promise = act(async () => {
      return debouncedFn();
    });

    act(() => {
      debouncedFn();
    });

    await expect(promise).rejects.toBeUndefined();
  });
});
