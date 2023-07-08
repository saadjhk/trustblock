import { useContext } from "react";
import EventForm, { EventFormMode } from "../components/EventForm/EventForm";
import { useUpdateEventContext } from "../context/UpdateEventContext";

export default function UpdateEventPage() {
    const { eventToBeUpdated } = useUpdateEventContext();

  return (
    eventToBeUpdated && (
      <EventForm
        mode={EventFormMode.Update}
        updateParams={{
          id: eventToBeUpdated.id,
          eventInfo: {
            ...eventToBeUpdated,
          },
        }}
      />
    )
  );
}
