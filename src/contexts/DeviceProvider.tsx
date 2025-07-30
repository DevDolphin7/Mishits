import { useState, useEffect, type ReactElement } from "react";
import { getDevice } from "../components/utils/utils";
import sizes from "../components/utils/sizes";
import { DeviceContext } from "./Device";

export const ProvideDevice = ({ children }: { children: ReactElement[] }) => {
  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < sizes.mobileMaxWidth && device !== "mobile") {
        setDevice("mobile");
      } else if (
        window.innerWidth > sizes.mobileMaxWidth &&
        window.innerWidth < sizes.tabletMaxWidth &&
        device !== "tablet"
      ) {
        setDevice("tablet");
      } else if (
        window.innerWidth > sizes.tabletMaxWidth &&
        device !== "monitor"
      ) {
        setDevice("monitor");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [device]);

  return (
    <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
  );
};
