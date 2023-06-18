import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { store, AppDispatch } from "../../app/store";

import { login } from "../auth/authSlice";
import { WorkoutItem } from "./WorkoutItem";
import { Modal } from "../../components/Modal";

export const WorkoutsList = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [deleteWorkoutModalIsOpen, setDeleteWorkoutModalIsOpen] =
    useState(false);
  const [loginError, setLoginError] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state) => store.getState().auth.data);
  const authStatus = useSelector((state) => store.getState().auth.status);

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

  const contentTest = [1, 2, 3, 4, 5].map((value) => {
    return <WorkoutItem key={value} />;
  });

  return (
    <div className="flex flex-col py-2">
      <div className="flex w-2/5 mx-auto">
        <p className="font-bold text-xl">Workouts</p>
        {auth !== "" ? (
          <button className="bg-green-600 hover:bg-green-700 focus:bg-green-700 font-semibold text-white rounded-md hover:shadow-md focus:shadow-md outline-none px-4 py-1 ml-auto">
            Add Workout
          </button>
        ) : (
          <button
            className="bg-sky-600 hover:bg-sky-700 focus:bg-sky-700 font-semibold text-white rounded-md hover:shadow-md focus:shadow-md outline-none px-4 py-1 ml-auto"
            onClick={() => setLoginModalIsOpen(true)}
          >
            Login
          </button>
        )}
      </div>
      {contentTest}

      {loginModalIsOpen && (
        <Modal title="Login" closeModal={() => setLoginModalIsOpen(false)}>
          <form className="flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className=" bg-white text-gray-700 border border-gray-200 rounded-md p-1"
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
                className="bg-white text-gray-700 border border-gray-200 rounded-md p-1"
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
