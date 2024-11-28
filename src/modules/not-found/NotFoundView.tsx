import { NavLink } from "react-router-dom";

const NotFoundView = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-xl text-gray-600">
              Oops! This route doesn’t exist yet!
            </p>
            <NavLink
              to="/"
              className="mt-6 inline-block rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 transition"
            >
              Go Back
            </NavLink>
          </div>
        </div>
      );
}

export default NotFoundView