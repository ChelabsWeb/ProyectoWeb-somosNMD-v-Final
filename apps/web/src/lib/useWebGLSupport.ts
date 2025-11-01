import { useEffect, useState } from "react";

/**
 * Hook to detect WebGL support in the browser
 * Returns true if WebGL is available, false otherwise
 */
export function useWebGLSupport(): boolean | null {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      setIsSupported(!!context);
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  return isSupported;
}
