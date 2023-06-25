// Core
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

// Features
import { selectWorkoutById } from "./workoutsSlice";
import { selectAllMoveCategories } from "../moveCategories/moveCategoriesSlice";
import { selectAllMoves } from "../moves/movesSlice";

// Utils
import { DateUtils } from "../../utils/dateUtils";

export const WorkoutDetails = () => {
  const navigate = useNavigate();

  const params = useParams();
  const workout = useSelector((state) =>
    selectWorkoutById(state, String(params.id))
  );

  useEffect(() => {
    if (workout === undefined) {
      navigate("/");
    }
  }, [navigate, workout]);

  return (
    <div className="flex flex-col py-2 xl:w-2/3 sm:w-5/6 sm:px-2 mx-auto">
      TODO
    </div>
  );
};
