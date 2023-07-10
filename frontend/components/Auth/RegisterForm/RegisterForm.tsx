import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/router";

export default function RegisterForm() {
  const router = useRouter();

  const initialValues = {
    email: "",
    confirmPassword: "",
    password: "",
  };

  async function registerUser(values: {
    email: string;
    password: string;
    confirmPassword: string | undefined;
  }) {
    values.confirmPassword = undefined;

    const registration = await axios.post(
      process.env.NEXT_PUBLIC_SERVER_BASE + "/api/auth/register",
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return registration.data;
  }

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create and account
        </h1>

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

            // if (!values.city) {
            //   errors.city = "City is required";
            // }

            // if (!values.description) {
            //   errors.description = "Description is required";
            // }

            // if (!values.name) {
            //   errors.name = "Name is required";
            // }

            // if (!values.date) {
            //   errors.date = "Date is required";
            // }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await registerUser(values);
              alert("Succesfully registered, check email.");
            } catch (error: any) {
              console.debug(error);
              console.log(error.toString());
            } finally {
              setSubmitting(false);
            }
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
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={values.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
