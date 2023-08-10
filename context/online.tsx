"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

const OnlineContext = createContext(true);

type Props = {
  children: ReactNode;
};

export function OnlineProvider({ children }: Props) {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    window.addEventListener(
      "online",
      () => {
        setOnline(true);
      },
      { signal }
    );

    window.addEventListener(
      "offline",
      () => {
        setOnline(false);
      },
      { signal }
    );
    return controller.abort;
  }, []);

  return (
    <OnlineContext.Provider value={online}>{children}</OnlineContext.Provider>
  );
}
export default OnlineContext;
