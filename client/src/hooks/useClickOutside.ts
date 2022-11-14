import { useEffect } from "react";

const useClickOutside = (ref: any, callback: any, isOpen = true) => {
  const handleClickOutside = (e: any) => {
    if (isOpen && ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

export default useClickOutside;
