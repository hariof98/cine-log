import { useEffect, useRef, useState } from "react";

const Ratings = ({ onConfirm, maxRating }) => {
    const [stars, setStars] = useState([]);
    const [input, setInput] = useState("");

    let starRef = useRef(0);

    const initStars = () => {
        let arr = [];

        for (let i = 0; i < maxRating; i++) {
            arr.push({ id: i + 1, isActive: false });
        }

        setStars(arr);
    };

    const markRatings = (data) => {
        starRef.current = data.id;

        setStars((prev) => {
            return prev.map((star) => {
                return { ...star, isActive: star.id <= data.id };
            });
        });
    };

    const clearRatings = () => {
        starRef.current = 0;

        setStars((prev) => {
            return prev.map((star) => {
                return { ...star, isActive: false };
            });
        });
    };

    useEffect(() => {
        initStars();
    }, []);

    return (
        <div className="star-rating">
            <p>Please select a rating</p>

            {stars.length > 0 && (
                <div className="star-container">
                    {stars.map((star) => {
                        return (
                            <div
                                key={star.id}
                                className="stars"
                                style={star.isActive ? { backgroundColor: "gold" } : {}}
                                onClick={() => {
                                    markRatings(star);
                                }}></div>
                        );
                    })}
                </div>
            )}

            <span
                onClick={() => {
                    clearRatings();
                }}>
                Clear Ratings
            </span>

            <input
                className="modal-input"
                value={input}
                type="text"
                placeholder="Leave a note..."
                onChange={(e) => {
                    setInput(e.target.value);
                }}
            />

            <button
                className="modal-btn"
                disabled={starRef.current === 0}
                onClick={() => {
                    onConfirm(starRef.current, input);
                }}>
                Confirm
            </button>
        </div>
    );
};

export default Ratings;
