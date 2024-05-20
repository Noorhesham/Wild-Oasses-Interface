"use client";
import { ReactNode, createContext, useState, Dispatch, SetStateAction, useContext } from "react";
interface Range {
  from: Date | undefined;
  to: Date | undefined;
}

interface ReservationContextType {
  range: Range;
  setRange: Dispatch<SetStateAction<Range>>;
  resetRange:any
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);
const initialState: Range = { from: undefined, to: undefined };
function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<Range>(initialState);
  const resetRange=()=>setRange(initialState)
  return <ReservationContext.Provider value={{ range, setRange,resetRange }}>{children}</ReservationContext.Provider>;
}
function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) throw new Error("context was throw out of provider ");
  return context;
}
export { ReservationProvider, useReservation };
