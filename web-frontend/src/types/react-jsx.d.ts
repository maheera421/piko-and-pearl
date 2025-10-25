// Minimal declarations to avoid ambient errors in environments where @types/react
// is not installed. This is a small compatibility shim so the dev server can run.
// Recommended: install @types/react and @types/react-dom for full typings.

declare module 'react' {
  // Minimal named exports used across the project. These are typed as `any` to
  // avoid blocking compilation in environments where @types/react isn't
  // installed. For full typing, install `@types/react` and `@types/react-dom`.
  export function useState<T = any>(initial?: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  export function useEffect(effect: (() => void) | (() => (() => void) | void), deps?: any[]): void;
  export function useRef<T = any>(initial?: T): { current: T };
  export function useContext<T = any>(ctx: any): T;
  export function createContext<T = any>(defaultValue?: T): any;
  export function useMemo<T = any>(fn: () => T, deps?: any[]): T;
  export function useCallback<T = any>(fn: T, deps?: any[]): T;
  export type ReactNode = any;
  export type FC<P = {}> = any;
  const React: any;
  export default React;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare namespace JSX {
  // Allow any intrinsic element to avoid 'JSX.IntrinsicElements' missing errors.
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Minimal React namespace types used in the codebase (e.g. React.FormEvent)
declare namespace React {
  type FormEvent = any;
  type ChangeEvent<T = any> = any;
  type MouseEvent<T = any> = any;
  type KeyboardEvent<T = any> = any;
}
