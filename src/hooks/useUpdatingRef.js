import { useEffect, useRef, useState } from "react";

/**
 * Updates a ref when the value changes. Also manages rerendering.
 * @param {*} initialValue The initial value of the ref.
 * @returns A tuple containing the value, a setter for the value and the ref.
 */
export function useUpdatingRef(initialValue) {
  const [value, setValue] = useState(initialValue);

  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}