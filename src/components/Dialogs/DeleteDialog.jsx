import { useContext } from "react";
import MoviesData from "../../utils/contexts/MovieContext";

const DeleteDialog = ({ listId, movie, onClose }) => {
    const { removeFromList } = useContext(MoviesData);

    const processDelete = () => {
        removeFromList(listId, movie.imdbID);

        onClose();
    };

    return (
        <>
            <h3>Remove?</h3>

            <p className="dialog-text">
                Are you sure you want to remove <strong>{movie?.Title}</strong>?
            </p>

            <div className="dialog-actions">
                <button className="modal-btn dialog-cancel" onClick={onClose}>
                    Cancel
                </button>

                <button
                    className="modal-btn dialog-confirm"
                    onClick={() => {
                        processDelete();
                    }}>
                    Remove
                </button>
            </div>
        </>
    );
};

export default DeleteDialog;
