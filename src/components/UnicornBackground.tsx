import { useEffect } from "react";

/* UnicornStudio interactive WebGL background.
   Loads the CDN script once, then lets init() scan for our [data-us-project] node. */

const SCRIPT_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";

declare global {
  interface Window {
    UnicornStudio?: { isInitialized: boolean; init: () => void };
  }
}

export function UnicornBackground({
  projectId,
  className = "",
}: {
  projectId: string;
  className?: string;
}) {
  useEffect(() => {
    const init = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    if (window.UnicornStudio) {
      init();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>("script[data-unicorn-loader]");
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.setAttribute("data-unicorn-loader", "");
      document.body.appendChild(script);
    }
    script.addEventListener("load", init);
    return () => script?.removeEventListener("load", init);
  }, [projectId]);

  return (
    <div
      data-us-project={projectId}
      data-us-dpi="1"
      data-us-scale="1"
      data-us-fps="30"
      className={className}
    />
  );
}
