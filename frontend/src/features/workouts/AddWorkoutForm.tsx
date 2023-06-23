// Core
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store, AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Features
import { createWorkout } from "./workoutsSlice";
import { selectAllMoveCategories } from "../moveCategories/moveCategoriesSlice";
import { selectAllMoves } from "../moves/movesSlice";

// Interfaces
import { MoveAmount } from "../../interfaces/MoveAmount";

// Utils
import { DateUtils } from "../../utils/dateUtils";

export const AddWorkoutForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState(false);

  const moveCategories: any[] = useSelector(selectAllMoveCategories);

  const moves: any[] = useSelector(selectAllMoves);
  const workoutsSliceStatus = useSelector(
    (state) => store.getState().workouts.status
  );

  const movesByCategory = (categoryID: number) =>
    moves.filter((move) => move.category_id === categoryID);

  const [trackedDuration, setTrackedDuration] = useState("");
  const onTrackedDurationChange = (e: any) =>
    setTrackedDuration(e.target.value);

  const [ingameDuration, setIngameDuration] = useState("");
  const onIngameDurationChange = (e: any) => setIngameDuration(e.target.value);

  const [trackedKcal, setTrackedKcal] = useState(0);
  const onTrackedKcalChange = (e: any) => setTrackedKcal(e.target.value);

  const [ingameKcal, setIngameKcal] = useState(0);
  const onIngameKcalChange = (e: any) => setIngameKcal(e.target.value);

  const [start, setStart] = useState("");
  const onStartChange = (e: any) => setStart(e.target.value);

  const [end, setEnd] = useState("");
  const onEndChange = (e: any) => setEnd(e.target.value);

  const [workoutMoves, setWorkoutMoves] = useState<MoveAmount[]>([]);
  const onWorkoutMoveChange = (index: number, e: any) => {
    workoutMoves[index].move_id = e.target.value;
  };

  const onWorkoutMoveAmountChange = (index: number, e: any) => {
    workoutMoves[index].amount = e.target.value;
  };

  const onAddWorkoutMoveButtonClicked = () =>
    setWorkoutMoves([...workoutMoves, { move_id: moves[0].id, amount: 0 }]);

  const onRemoveMoveButtonClicked = (index: number) => {
    const updatedWorkoutMoves = workoutMoves;
    updatedWorkoutMoves.splice(index, 1);

    setWorkoutMoves([...updatedWorkoutMoves]);
  };

  let workoutMovesContent = workoutMoves.map((workoutMove, idx) => {
    return (
      <div className="ml-2 mt-2" key={idx}>
        <button
          title="Remove Move"
          className="text-red-600 hover:text-red-700 focus:text-red-700 outline-none mr-2"
          onClick={() => onRemoveMoveButtonClicked(idx)}
        >
          <FontAwesomeIcon
            icon="square-minus"
            className="h-5"
            style={{ marginBottom: "-.2em" }}
          />
        </button>

        <select
          name={`workout-move-${idx}`}
          id={`workout-move-${idx}`}
          className="rfa-input sm:w-36 w-56"
          onChange={(e) => onWorkoutMoveChange(idx, e)}
        >
          {moveCategories.map((moveCategory: any) => (
            <optgroup key={moveCategory.id} label={moveCategory.name}>
              {movesByCategory(moveCategory.id).map((move) => (
                <option key={move.id} value={move.id}>
                  {move.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <input
          type="number"
          name={`amount-${idx}`}
          id={`amount-${idx}`}
          min="0"
          className="rfa-input sm:w-12 w-24 ml-2"
          onChange={(e) => onWorkoutMoveAmountChange(idx, e)}
        />
      </div>
    );
  });

  const canSave = [
    trackedDuration,
    ingameDuration,
    trackedKcal,
    ingameKcal,
    start,
    end,
  ].every(Boolean);

  const onSubmitButtonClicked = async () => {
    try {
      setSubmitError(false);
      dispatch(
        createWorkout({
          duration_ingame: DateUtils.hmsToSeconds(ingameDuration),
          duration_real: DateUtils.hmsToSeconds(trackedDuration),
          kcal_ingame: ingameKcal,
          kcal_real: trackedKcal,
          start_at: start,
          end_at: end,
          moves: workoutMoves,
        })
      );
    } catch (error) {
      setSubmitError(true);
      console.error(`Failed to add workout: ${error}`);
    } finally {
      if (workoutsSliceStatus === "succeeded") {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (workoutsSliceStatus === "failed") {
      setSubmitError(true);
    } else {
      setSubmitError(false);
    }
  }, [navigate, workoutsSliceStatus]);

  return (
    <div className="flex flex-col py-2 xl:w-2/3 sm:w-5/6 sm:px-2 mx-auto">
      <div className="flex flex-col">
        <p className="font-bold text-xl">Add Workout</p>
        <div className="flex flex-col bg-white rounded-md mt-4 p-2">
          <div className="font-bold text-xl text-orange-500 border-b px-2 mb-2 pb-2">
            Workout Details
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:gap-2">
            <div className="grid mx-2">
              <label htmlFor="start" className="font-semibold">
                Start <span className="text-red-600">*</span>
              </label>
              <input
                type="datetime-local"
                name="start"
                id="start"
                className="rfa-input w-56"
                step="1"
                onChange={onStartChange}
              />
            </div>

            <div className="grid mx-2">
              <label htmlFor="end" className="font-semibold">
                End <span className="text-red-600">*</span>
              </label>
              <input
                type="datetime-local"
                name="end"
                id="end"
                className="rfa-input w-56"
                step="1"
                onChange={onEndChange}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4">
            <div className="grid mx-2">
              <label htmlFor="duration-real" className="font-semibold">
                Duration (tracked) <span className="text-red-600">*</span>
              </label>
              <input
                type="time"
                name="duration-real"
                id="duration-real"
                className="rfa-input w-40"
                step="1"
                onChange={onTrackedDurationChange}
              />
            </div>

            <div className="grid mx-2">
              <label htmlFor="duration-ingame" className="font-semibold">
                Duration (in game) <span className="text-red-600">*</span>
              </label>
              <input
                type="time"
                name="duration-ingame"
                id="duration-ingame"
                className="rfa-input w-40"
                step="1"
                onChange={onIngameDurationChange}
              />
            </div>

            <div className="grid mx-2">
              <label htmlFor="kcal-real" className="font-semibold">
                Kcal burned (tracked) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="kcal-real"
                id="kcal-real"
                className="rfa-input w-40"
                min="0"
                onChange={onTrackedKcalChange}
              />
            </div>

            <div className="grid mx-2">
              <label htmlFor="kcal-ingame" className="font-semibold">
                Kcal burned (in game) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="kcal-ingame"
                id="kcal-ingame"
                className="rfa-input w-40"
                min="0"
                onChange={onIngameKcalChange}
              />
            </div>
          </div>

          <div className="font-bold text-xl text-orange-500 border-b px-2 mt-4 pb-2">
            Moves
            <button
              className="bg-green-600 hover:bg-green-700 focus:bg-green-700 hover:shadow-md font-semibold text-sm text-white outline-none rounded-md px-4 py-1 ml-4"
              onClick={onAddWorkoutMoveButtonClicked}
            >
              Add Move
            </button>
          </div>

          {workoutMoves.length > 0 && (
            <div className="flex flex-row font-semibold mt-2">
              <div className="ml-9">Move</div>
              <div className="sm:hidden md:block ml-48">Amount / Duration</div>
              <div className="sm:block md:hidden sm:ml-28 ml-48">Amount</div>
            </div>
          )}
          {workoutMovesContent}

          <div className="border-b py-2"></div>

          <div className="flex ml-auto mt-2">
            {submitError && (
              <div className="text-xs text-red-700 mt-1 mr-2">
                An error occurred while creating the workout.
              </div>
            )}

            <button
              className="bg-green-600 hover:bg-green-700 focus:bg-green-700 hover:shadow-md disabled:bg-green-300 disabled:pointer-events-none font-semibold text-sm text-white outline-none rounded-md px-4 py-1 mr-2"
              onClick={onSubmitButtonClicked}
              disabled={!canSave}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};