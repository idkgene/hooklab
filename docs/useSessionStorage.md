# `useSessionStorage`

A convenient and efficient React hook that simplifies the process of storing and retrieving values from the browser's session storage, providing a seamless way to persist data across page refreshes. 💾🔑

```tsx
import { useSessionStorage } from "./useSessionStorage";

const MyComponent = () => {
  const [username, setUsername, removeUsername] = useSessionStorage(
    "username",
    ""
  );

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRemove = () => {
    removeUsername();
  };

  return (
    <div>
      <input type="text" value={username} onChange={handleChange} />
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};
```

## Reference

```tsx
export type InitialValueType = string | number | boolean | object | null;
export type StoredValue = InitialValueType;
export type SetValue = (
  value: InitialValueType | ((val: InitialValueType) => InitialValueType)
) => void;
export type RemoveValue = () => void;

/**
 * @param {string} key - The key to use for storing and retrieving the value in session storage.
 * @param {InitialValueType} [initialValue] - The initial value to use if no value is found in session storage.
 * @returns {Readonly<[StoredValue, SetValue, RemoveValue]>} An array with three elements:
 *   - StoredValue: The current value stored in session storage for the given key.
 *   - SetValue: A function to update the value in session storage for the given key.
 *   - RemoveValue: A function to remove the value from session storage for the given key.
 */
export function useSessionStorage(
  key: string,
  initialValue?: InitialValueType
): Readonly<[StoredValue, SetValue, RemoveValue]>;
```

## Under the hood

The `useSessionStorage` hook leverages React's `useState` hook to manage the stored value state. It retrieves the initial value from session storage using the provided key, falling back to the specified initial value if no stored value exists. The hook returns an array containing the stored value, a function to update the value, and a function to remove the value from session storage. It ensures proper JSON serialization and deserialization of the stored values and gracefully handles any errors that may occur during the process.