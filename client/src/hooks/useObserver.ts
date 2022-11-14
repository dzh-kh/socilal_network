import { useEffect, useRef } from "react";

export const useObserver = (
  ref: any,
  canLoad: boolean,
  isLoading: boolean,
  callback: Function
): void => {
  const observer = useRef<any>();
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    const cb = function (entries: any, observer: any) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current);
  }, [isLoading, ref.current]);
};
