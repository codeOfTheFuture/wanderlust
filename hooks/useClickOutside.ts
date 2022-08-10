import { RefObject, useEffect, useRef } from "react";

function useEventListener(
  eventType: string,
  callback: (event: Event) => void,
  element = window
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  cb: (e: Event) => void
) {
  useEventListener(
    "click",
    e => {
      if (ref.current === null || ref.current.contains(e.target as HTMLElement))
        return;
      cb(e);
    },
    window
  );
}
