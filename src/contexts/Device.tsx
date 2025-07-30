import { createContext } from "react";
import { getDevice } from "../components/utils/utils";

export const DeviceContext = createContext(getDevice());
