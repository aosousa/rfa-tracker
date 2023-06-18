import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { store } from "../app/store";

export const TopBar = () => {
  const authStatus = useSelector((state) => store.getState().auth.status);

  return (
    <div className="h-12 flex flex-row items-center bg-white shadow-sm border-b">
      <div className="flex font-semibold flex-shrink-0 ml-4 pr-4 border-r">
        <div className="bg-orange-500 text-white text-lg rounded-md p-1.5">
          Ring Fit Adventure Tracker
        </div>
      </div>

      <div className="flex flex-shrink-0 ml-2">
        <NavLink
          exact
          to="/"
          className="font-semibold text-gray-700 p-1.5"
          activeClassName="active-link"
        >
          Workouts
        </NavLink>
      </div>

      {authStatus !== "" && (
        <div className="flex flex-shrink-0 ml-2">
          <NavLink
            exact
            to="/add-workout"
            className="font-semibold text-gray-700 p-1.5"
            activeClassName="active-link"
          >
            Add Workout
          </NavLink>
        </div>
      )}
    </div>
  );
};
