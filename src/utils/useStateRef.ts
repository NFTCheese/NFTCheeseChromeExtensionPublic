import {
  MutableRefObject, useEffect, useRef, useState,
} from 'react';

export default function useStateRef<T>(
  initialValue: T,
): [T, (v: T | ((t: T) => T)) => void, MutableRefObject<T>] {
  const [value, setValue] = useState(initialValue);

  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}
