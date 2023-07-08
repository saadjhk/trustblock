import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { EEvent } from "../interfaces/event";

const UpdateEventContext = createContext<{
  eventToBeUpdated: EEvent | null;
  setEventToBeUpdated: Dispatch<SetStateAction<EEvent | null>> | undefined;
}>({
  eventToBeUpdated: null,
  setEventToBeUpdated: undefined,
});

export const UpdateEventContextProvider = ({ children }: PropsWithChildren) => {
  const [eventToBeUpdated, setEventToBeUpdated] = useState<EEvent | null>(null);

  return (
    <UpdateEventContext.Provider
      value={{
        eventToBeUpdated,
        setEventToBeUpdated,
      }}
    >
      {children}
    </UpdateEventContext.Provider>
  );
};

export function useUpdateEventContext() {
  const updateEventContext = useContext(UpdateEventContext);
  return updateEventContext;
}
