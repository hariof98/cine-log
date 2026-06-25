import { useContext, useState } from "react";
import Search from "../Search/Search";
import MoviesData from "../../utils/contexts/MovieContext";
import placeholder from "../../../public/assets/placeholder.avif";
import MoviesLists from "../MoviesLists/MoviesLists";
import CustomList from "../Dialogs/CustomList";
import Modal from "../Modal/Modal";
import Ratings from "../Ratings/Ratings";

const Main = () => {
    const { library, addToList } = useContext(MoviesData);
    const list = library.lists;

    const [activeTab, setActiveTab] = useState(Object.keys(list)[0]);
    const [results, setResults] = useState([]);
    const [newLabel, setNewLabel] = useState(false);
    const [ratings, setRatings] = useState(false);

    const addToStore = (listId, movie) => {
        if (listId === "watchedlog") {
            setRatings(movie);
            setResults([]);

            return;
        }

        addToList(listId, movie);

        setResults([]);
    };

    const closeNewList = () => {
        setNewLabel(false);
    };

    const confirmWatched = (rating, note) => {
        addToList("watchedlog", { ...ratings, rating, note });

        setRatings(false);
    };

    return (
        <div className="selections">
            {Object.keys(list).length > 0 && (
                <div className="selection-bar">
                    {Object.keys(list).map((data) => {
                        return (
                            <div key={list[data].id}>
                                <button
                                    style={activeTab === list[data].id ? { backgroundColor: "#fa4343", color: "#ffffff" } : {}}
                                    className="selection-title"
                                    onClick={() => {
                                        setResults([]);

                                        setActiveTab(list[data].id);
                                    }}>
                                    {list[data].name}
                                </button>
                            </div>
                        );
                    })}

                    <div
                        className="add-control"
                        onClick={() => {
                            setNewLabel(true);
                        }}>
                        +
                    </div>
                </div>
            )}

            <div className="search-area">
                <Search onResults={setResults} />

                {results.length > 0 && (
                    <div className="search-dropdown">
                        {results.map((data) => {
                            let imgTag = data?.Poster === "N/A" || !data?.Poster ? placeholder : data?.Poster;

                            return (
                                <div
                                    className="search-results"
                                    key={data?.imdbID}
                                    style={data?.isAdded ? { cursor: "auto", opacity: "0.3" } : {}}
                                    onClick={() => {
                                        if (data.isAdded) {
                                            return;
                                        }

                                        addToStore(activeTab, data);
                                    }}>
                                    <img
                                        src={imgTag}
                                        alt={data?.Title}
                                        onError={(e) => {
                                            if (e.target.src !== placeholder) {
                                                e.target.src = placeholder;
                                            }
                                        }}
                                    />

                                    <div>
                                        <p>{data?.Title}</p>
                                        <p>{data?.Year}</p>

                                        {data.isAdded && <span>Already Added!</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <MoviesLists listId={activeTab} />

            {newLabel && (
                <Modal onClose={closeNewList}>
                    <CustomList onClose={closeNewList} />
                </Modal>
            )}

            {ratings && (
                <Modal
                    onClose={() => {
                        setRatings(false);
                    }}>
                    <Ratings maxRating={5} onConfirm={confirmWatched} />
                </Modal>
            )}
        </div>
    );
};

export default Main;
