// Core
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { store, AppDispatch } from "../../app/store";

// Components
import { Modal } from "../../components/Modal";

// Features
import { login } from "../auth/authSlice";
import { selectAllWorkouts } from "./workoutsSlice";

// Interfaces
import { WorkoutItem } from "./WorkoutItem";

export const WorkoutsList = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state) => store.getState().auth.data);
  const authStatus = useSelector((state) => store.getState().auth.status);
  const workouts = useSelector(selectAllWorkouts);

  const onUsernameChanged = (e: any) => setUsername(e.target.value);
  const onPasswordChanged = (e: any) => setPassword(e.target.value);
  const onLoginButtonClicked = async () => {
    try {
      setLoginError(false);
      await dispatch(
        login({
          username: username,
          password: password,
        })
      );
    } catch (error) {
      setLoginError(true);
      console.error(`Failed to login: ${error}`);
    }
  };

  useEffect(() => {
    if (authStatus === "failed") {
      setLoginError(true);
    } else {
      setLoginError(false);

      if (authStatus === "succeeded") {
        setLoginModalIsOpen(false);
      }
    }
  }, [authStatus]);

  let workoutItems = workouts.map((workout) => {
    return <WorkoutItem key={workout.id} workout={workout} />;
  });

  return (
    <div className="flex flex-col py-2 w-2/3 mx-auto">
      <div className="flex">
        <p className="font-bold text-xl">Workouts</p>
        {auth !== "" ? (
          <NavLink
            to="/add-workout"
            className="bg-green-600 hover:bg-green-700 focus:bg-green-700 font-semibold text-white rounded-md hover:shadow-md focus:shadow-md outline-none px-4 py-1 ml-auto"
          >
            <button>Add Workout</button>
          </NavLink>
        ) : (
          <button
            className="bg-sky-600 hover:bg-sky-700 focus:bg-sky-700 font-semibold text-white rounded-md hover:shadow-md focus:shadow-md outline-none px-4 py-1 ml-auto"
            onClick={() => setLoginModalIsOpen(true)}
          >
            Login
          </button>
        )}
      </div>

      <div className="flex bg-white rounded-md p-2 my-2 border-2 border-gray-300">
        <div className="w-full grid grid-cols-4 gap-4 font-semibold">
          <div className="flex flex-col">Date</div>
          <div className="flex flex-col">Duration (tracked / in game)</div>
          <div className="flex flex-col">Kcal burned (tracked / in game)</div>
          <div className="flex flex-col ml-auto">Actions</div>
        </div>
      </div>

      {workoutItems}

      {loginModalIsOpen && (
        <Modal title="Login" closeModal={() => setLoginModalIsOpen(false)}>
          <form className="flex flex-col mx-auto">
            <div className="flex flex-col">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className=" rfa-input"
                onChange={onUsernameChanged}
              />
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="rfa-input"
                onChange={onPasswordChanged}
              />
            </div>

            <button
              type="submit"
              className="flex justify-center items-center bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 hover:shadow-md text-white font-bold rounded-md disabled:pointer-events-none select-none p-1 mt-4"
              disabled={authStatus === "loading"}
              onClick={onLoginButtonClicked}
            >
              Login
            </button>

            {loginError && (
              <div className="mt-1 text-center text-xs text-red-700">
                Failed to authenticate user.
              </div>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};