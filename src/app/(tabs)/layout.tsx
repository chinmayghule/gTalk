"use client";

import Navbar from "@/components/navbar/Navbar";
import UniversalLoading from "@/components/loading/UniversalLoading";
import { useViewportSize } from "@/contexts/ViewportSize";
import cookie from "cookiejs";
import { useEffect } from "react";
import MessageManager from "@/components/messaging/MessageManager";
import { SocketProvider } from "@/contexts/SocketContext";

function TabsLayout({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useViewportSize();

  // add cookie to save viewport size (desktop or not)
  useEffect(() => {
    const isDesktopCookie = cookie.get("isDesktop");

    if (!isDesktopCookie) {
      cookie.set("isDesktop", String(window.innerWidth > 1024));
    }
  }, []);

  switch (isDesktop) {
    case true: {
      return (
        <SocketProvider>
          <main className="min-h-screen flex flex-row items-stretch">
            <Navbar />
            <aside className="overflow-y-scroll no-scrollbar w-[32rem] flex-shrink-0">
              {children}
            </aside>
            {isDesktop && (
              <section className="flex-grow self-stretch">
                <MessageManager />
              </section>
            )}
          </main>
        </SocketProvider>
      );
    }

    case false: {
      return (
        <SocketProvider>
          <main className="min-h-screen flex flex-col">
            <div className="flex-grow overflow-y-scroll no-scrollbar">
              {children}
            </div>
            <Navbar />
          </main>
        </SocketProvider>
      );
    }

    default: {
      return;
      <UniversalLoading />;
    }
  }
}

export default TabsLayout;
