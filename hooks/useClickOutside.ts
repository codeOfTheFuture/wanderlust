import { RefObject, useEffect, useRef, useState } from "react";

function useEventListener(
  eventType: string,
  callback: (e: Event) => void,
  element: (Window & typeof globalThis) | null
) {
  const callbackRef = useRef<(e: Event) => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: Event) => callbackRef.current(e);
    element?.addEventListener(eventType, handler);

    return () => element?.removeEventListener(eventType, handler);
  }, [eventType, element]);
}

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  cb: (e: Event) => void
) {
  const [element, setElement] = useState<(Window & typeof globalThis) | null>(
    null
  );

  useEffect(() => {
    setElement(window);
  }, []);

  useEventListener(
    "click",
    e => {
      if (ref.current === null || ref.current.contains(e.target as HTMLElement))
        return;
      cb(e);
    },
    element
  );
}
