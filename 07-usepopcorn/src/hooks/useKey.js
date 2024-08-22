import { useEffect } from "react";
export function useKey(key, keyName, action) {
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener(keyName, callback);

    return () => {
      document.removeEventListener(keyName, callback);
    };
  }, [key, action, keyName]);
}
