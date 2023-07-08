import moment from "moment";
import { EEvent } from "../../interfaces/event";

export enum EventOptions {
  Update,
  Delete,
}

interface EventCardProps {
  event: EEvent;
  actionsAvailable?: EventOptions[];
  disableActions?: boolean;
  onUpdate?: (e: EEvent) => Promise<boolean>;
  onDelete?: (e: EEvent) => Promise<boolean>;
}

export default function EventCard(props: EventCardProps) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2">
      <div className="relative bg-white rounded border">
        <picture className="block bg-gray-200 border-b">
          <img
            className="block"
            src="https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&amp;text=Card"
            alt="Card 1"
          />
        </picture>
        <div className="p-4">
          <h3 className="text-lg font-bold">
            <a className="stretched-link" href="#" title="Card 1">
              {props.event.name}
            </a>
          </h3>
          <h6 className="font-bold">
            <a className="stretched-link" href="#" title="Card 1">
              {props.event.city.charAt(0).toUpperCase() +
                props.event.city.slice(1)}
            </a>
          </h6>
          <time
            className="block mb-2 text-sm text-gray-600"
            dateTime={moment(props.event.date).format("YYYY-MM-DD")}
          >
            {moment(props.event.date).format("DD-MM-YYYY")}
          </time>
          <p>{props.event.description}</p>

          {props.actionsAvailable &&
            props.actionsAvailable.includes(EventOptions.Delete) && (
              <button
                onClick={() => {
                  if (props.onDelete) props.onDelete(props.event);
                }}
                type="button"
                className="mt-2 px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                disabled={props.disableActions}
              >
                Delete
              </button>
            )}
          {props.actionsAvailable &&
            props.actionsAvailable.includes(EventOptions.Update) && (
              <button
                type="button"
                onClick={() => {
                  if (props.onUpdate) props.onUpdate(props.event);
                }}
                disabled={props.disableActions}
                className="ml-2 px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
