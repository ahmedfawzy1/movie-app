import { createContext } from "react";
import { MovieContextType } from "../types/MovieContext";

export const MovieContext = createContext<MovieContextType | undefined>(undefined);
