"use client";

import { useState, useEffect, createContext, useContext } from "react";

export type ViewportSize = {
  isDesktop: boolean | undefined;
};

export const ViewportSizeContext = createContext<ViewportSize | undefined>(
  undefined
);

export const ViewportSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [viewportSize, setViewportSize] = useState<ViewportSize>({
    isDesktop: undefined,
  });

  useEffect(() => {
    const breakpointInPixels = 1024;
    setViewportSize({ isDesktop: window.innerWidth > breakpointInPixels });

    // Optional: Add a resize event listener to update the state when the window size changes
    const handleResize = () => {
      setViewportSize({ isDesktop: window.innerWidth > breakpointInPixels });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ViewportSizeContext.Provider value={viewportSize}>
      {children}
    </ViewportSizeContext.Provider>
  );
};

export const useViewportSize = (): ViewportSize => {
  const context = useContext(ViewportSizeContext);
  if (context === undefined) {
    throw new Error(
      "useViewportSize must be used within a ViewportSizeProvider"
    );
  }

  return context;
};
