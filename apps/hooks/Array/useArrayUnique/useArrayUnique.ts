import { useMemo, useCallback } from 'react';

/**
 * A React hook that returns a unique array of items based on a custom comparison function.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} items - The array of items to filter for unique values. If `items` is not an array, the hook returns an empty array.
 * @param {(a: T, b: T, array: T[]) => boolean} [compareFn] - Optional custom comparison function.
 * If provided, this function will be used to determine the equality of two items.
 * The function should take two items (`a` and `b`) and the original array as arguments and return `true` if they are considered equal, `false` otherwise.
 * @returns {T[]} A new array containing only the unique items from the input array.
 *
 * @example
 * // Filtering unique objects based on their 'id' property
 * import { useArrayUnique } from './useArrayUnique';
 *
 * const items = [{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }];
 * const uniqueItems = useArrayUnique(items, (a, b) => a.id === b.id);
 * console.log(uniqueItems); // Output: [{ id: 1 }, { id: 2 }, { id: 3 }]
 *
 * @example
 * // Filtering unique primitive values
 * const numbers = [1, 2, 2, 3, 3, 3, 4];
 * const uniqueNumbers = useArrayUnique(numbers);
 * console.log(uniqueNumbers); // Output: [1, 2, 3, 4]
 */
export function useArrayUnique<T>(
  items: T[],
  compareFn?: (a: T, b: T, array: T[]) => boolean
): T[] {
  const compareItems = useCallback(
    (a: T, b: T, array: T[]) => {
      if (compareFn) {
        return compareFn(a, b, array);
      }
      return JSON.stringify(a) === JSON.stringify(b);
    },
    [compareFn]
  );

  return useMemo(() => {
    const uniqueItems: T[] = [];

    items.forEach(item => {
      if (
        !uniqueItems.some(uniqueItem => compareItems(item, uniqueItem, items))
      ) {
        uniqueItems.push(item);
      }
    });
    return uniqueItems;
  }, [items, compareItems]);
}