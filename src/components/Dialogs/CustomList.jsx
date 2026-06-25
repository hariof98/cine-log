import React, { useContext, useState } from "react";
import MoviesData from "../../utils/contexts/MovieContext";

const CustomList = ({ onClose }) => {
    const [label, setLabel] = useState("");

    const { addNewList } = useContext(MoviesData);

    const addLabel = () => {
        if (!label.trim()) {
            return;
        }

        addNewList(label.trim());

        onClose();
    };

    return (
        <div className="dialog-actions">
            <label htmlFor="label">Custom List</label>

            <input
                id="label"
                placeholder="Enter a custom list"
                className="modal-input"
                value={label}
                onChange={(e) => {
                    setLabel(e.target.value);
                }}
            />

            <button
                disabled={!label}
                className="modal-btn"
                onClick={() => {
                    addLabel();
                }}>
                Confirm
            </button>
        </div>
    );
};

export default CustomList;
