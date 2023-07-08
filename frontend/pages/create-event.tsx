import EventForm, { EventFormMode } from "../components/EventForm/EventForm";

export default function CreateEventPage() {
  return <EventForm mode={EventFormMode.Create} />;
}
