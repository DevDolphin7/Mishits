import sizes from "./sizes";

const getDevice = (): Device => {
  if (window.innerWidth < sizes.mobileMaxWidth) return "mobile";
  if (window.innerWidth < sizes.tabletMaxWidth) return "tablet";
  return "monitor";
};

export { getDevice }