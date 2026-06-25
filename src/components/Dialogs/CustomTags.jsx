import React, { useContext, useState } from "react";
import MoviesData from "../../utils/contexts/MovieContext";

const CustomTags = ({ movie, onClose }) => {
    const [label, setLabel] = useState("");

    const { updateTags } = useContext(MoviesData);

    const addTags = () => {
        if (!label.trim()) {
            return;
        }

        updateTags(movie.imdbID, label.trim());

        onClose();
    };

    return (
        <div className="dialog-actions">
            <label htmlFor="label">Cutsom Tag</label>

            <input
                id="label"
                className="modal-input"
                placeholder="Enter a custom tag"
                value={label}
                onChange={(e) => {
                    setLabel(e.target.value);
                }}
            />

            <button
                disabled={!label}
                className="modal-btn"
                onClick={() => {
                    addTags();
                }}>
                Confirm
            </button>
        </div>
    );
};

export default CustomTags;
