import { useContext, useRef, useState } from "react";
import MoviesData from "../../utils/contexts/MovieContext";
import Modal from "../Modal/Modal";
import MoveDialog from "../Dialogs/MoveDialog";
import DeleteDialog from "../Dialogs/DeleteDialog";
import placeholder from "../../../public/assets/placeholder.avif";
import CustomTags from "../Dialogs/CustomTags";

const MoviesLists = ({ listId, maxRating = 5 }) => {
    const [moving, setMoving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [tags, setTags] = useState(false);

    const { getMovies } = useContext(MoviesData);

    const results = getMovies(listId);

    const selectedMovie = useRef(null);

    const closeModal = () => {
        selectedMovie.current = null;

        setMoving(false);
        setDeleting(false);
        setTags(false);
    };

    return (
        <div>
            {results.length > 0 ? (
                results.map((data) => {
                    let imgTag = data?.Poster === "N/A" || !data?.Poster ? placeholder : data?.Poster;

                    return (
                        <div key={data.imdbID} className="card-data">
                            <img
                                src={imgTag}
                                alt={data.Title}
                                onError={(e) => {
                                    if (e.target.src !== placeholder) {
                                        e.target.src = placeholder;
                                    }
                                }}
                            />

                            <div className="card-info">
                                <h2>{data.Title}</h2>
                                <p>{data.Year}</p>
                                <p className="tag">{data.Type.toUpperCase()}</p>

                                {data.customTags && <p className="tag custom-tag">{"#" + data.customTags}</p>}

                                {data.rating > 0 && (
                                    <p className="rating-badge">
                                        <span className="rating-star">★</span>
                                        {data.rating} / {maxRating}
                                    </p>
                                )}

                                {data.note && <p className="note">"{data.note}"</p>}
                            </div>

                            <div className="card-controls">
                                <div>
                                    <span
                                        title="Delete"
                                        style={{ color: "red" }}
                                        onClick={() => {
                                            selectedMovie.current = data;

                                            setDeleting(true);
                                        }}>
                                        ✘
                                    </span>

                                    {listId !== "watchedlog" && (
                                        <span
                                            title="Move"
                                            onClick={() => {
                                                selectedMovie.current = data;

                                                setMoving(true);
                                            }}>
                                            ➜
                                        </span>
                                    )}
                                </div>

                                <p
                                    onClick={() => {
                                        selectedMovie.current = data;

                                        setTags(true);
                                    }}
                                    className="tag-line">
                                    Tags
                                </p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>This list is empty.</p>
            )}

            {(moving || deleting || tags) && (
                <Modal onClose={closeModal}>
                    {moving && <MoveDialog listId={listId} movie={selectedMovie.current} maxRating={maxRating} onClose={closeModal} />}

                    {deleting && <DeleteDialog listId={listId} movie={selectedMovie.current} onClose={closeModal} />}

                    {tags && <CustomTags movie={selectedMovie.current} onClose={closeModal} />}
                </Modal>
            )}
        </div>
    );
};

export default MoviesLists;
