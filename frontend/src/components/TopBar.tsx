import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { store } from '../app/store';

export const TopBar = () => {
  const authData = useSelector(() => store.getState().auth.data);

  return (
    <div className="h-12 flex flex-row items-center bg-white shadow-sm border-b">
      <div className="flex font-semibold flex-shrink-0 ml-4 pr-4 border-r">
        <div className="sm:hidden md:block bg-orange-500 text-white text-lg rounded-md p-1.5">
          Ring Fit Adventure Tracker
        </div>
        <div className="sm:block md:hidden bg-orange-500 text-white text-lg rounded-md p-1.5">
          RFA Tracker
        </div>
      </div>

      <div className="flex flex-shrink-0 ml-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            (isActive ? 'active-link' : 'inactive-link')
          }
        >
          Workouts
        </NavLink>
      </div>

      {authData !== '' && (
        <div className="flex flex-shrink-0 ml-2">
          <NavLink
            to="/add-workout"
            className={({ isActive }) =>
              (isActive ? 'active-link' : 'inactive-link')
            }
          >
            Add Workout
          </NavLink>
        </div>
      )}
    </div>
  );
};
