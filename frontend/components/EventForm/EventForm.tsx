import { Formik } from "formik";
import { EEvent, EventCities } from "../../interfaces/event";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import moment from "moment";

export enum EventFormMode {
  Create,
  Update,
}

interface EventFormProps {
  mode: EventFormMode;
  updateParams?: {
    id: string;
    eventInfo?: {
      name: string;
      city: EventCities;
      description: string;
      date: Date;
    };
  };
}

export default function EventForm(props: EventFormProps) {
  const { data } = useSession();
  const router = useRouter();

  const [initialValues, _setInitialValues] = useState(
    props.mode === EventFormMode.Update && props.updateParams?.eventInfo
      ? {
          name: props.updateParams.eventInfo.name,
          description: props.updateParams.eventInfo.description,
          city: props.updateParams.eventInfo.city,
          date: new Date(props.updateParams.eventInfo.date),
        }
      : {
          name: "",
          description: "",
          city: "",
          date: new Date(),
        }
  );

  function createEvent(values: EEvent) {
    return axios.post(
      process.env.NEXT_PUBLIC_SERVER_BASE + "/api/events/create",
      values,
      { headers: { Authorization: "Bearer " + (data as any).accessToken } }
    );
  }

  async function updateEvent(eventId: string, values: EEvent) {
    try {
      await axios.put(
        process.env.NEXT_PUBLIC_SERVER_BASE + "/api/events/update/" + eventId,
        values,
        { headers: { Authorization: "Bearer " + (data as any).accessToken } }
      );
      router.push("/");
    } catch (error: any) {
      console.log(error.toString());
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validate={(values) => {
          let errors: {
            name?: string;
            description?: string;
            city?: string;
            date?: string;
          } = {};

          if (!values.city) {
            errors.city = "City is required";
          }

          if (!values.description) {
            errors.description = "Description is required";
          }

          if (!values.name) {
            errors.name = "Name is required";
          }

          if (!values.date) {
            errors.date = "Date is required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const call =
            props.mode === EventFormMode.Create
              ? createEvent(values as EEvent)
              : props.updateParams
              ? updateEvent(props.updateParams?.id, values as EEvent)
              : alert("Error submitting form");
          try {
            await call;
            router.push('/');
          } catch (error: any) {
            console.log(error.toString());
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            className="w-full max-w-lg"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  onChange={handleChange}
                  value={values.name}
                  className={
                    "appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    //   + ' border-red-500'
                  }
                  id="name"
                  type="text"
                  placeholder="Fun Event"
                  name="name"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <select
                  onChange={handleChange}
                  value={values.city}
                  id="city"
                  name="city"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  {Object.values(EventCities)
                    .filter((v) => isNaN(Number(v)))
                    .map((city) => {
                      return (
                        <option key={city} value={city}>
                          {city.charAt(0).toUpperCase() + city.slice(1)}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Date
                </label>
                <input
                  onChange={handleChange}
                  value={
                    typeof values.date === "object"
                      ? moment(values.date).format('YYYY-MM-DD')
                      : values.date
                  }
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="date"
                  placeholder="Albuquerque"
                  id="date"
                  name="date"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Description
                </label>
                <textarea
                  onChange={handleChange}
                  value={values.description}
                  id="description"
                  name="description"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={
                    "w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  }
                >
                  {props.mode === EventFormMode.Create ? "Create" : "Update"}{" "}
                  Event
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
