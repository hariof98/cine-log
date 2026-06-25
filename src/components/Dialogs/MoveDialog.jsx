import { useContext, useState } from "react";
import MoviesData from "../../utils/contexts/MovieContext";
import Ratings from "../Ratings/Ratings";

const MoveDialog = ({ listId, movie, maxRating, onClose }) => {
    const { library, moveMovie } = useContext(MoviesData);

    const [targetList, setTargetList] = useState(null);

    const targets = Object.keys(library.lists).filter((key) => {
        return key !== listId;
    });

    const confirmMove = (rating, note) => {
        // listId is src
        moveMovie(listId, targetList, movie.imdbID, rating, note);

        onClose();
    };

    return (
        <>
            <h3>Move to</h3>

            {targets.map((target) => {
                return (
                    <div
                        key={target}
                        style={targetList === target ? { background: "green", color: "#ffffff" } : {}}
                        className="move-option"
                        onClick={() => {
                            setTargetList(target);
                        }}>
                        <p>{target.toUpperCase()}</p>
                    </div>
                );
            })}

            {targetList === "watchedlog" && (
                <Ratings
                    maxRating={maxRating}
                    onConfirm={(rating, note) => {
                        confirmMove(rating, note);
                    }}
                />
            )}

            {targetList && targetList !== "watchedlog" && (
                <button
                    className="modal-btn"
                    onClick={() => {
                        confirmMove(0, "");
                    }}>
                    Confirm
                </button>
            )}
        </>
    );
};

export default MoveDialog;
