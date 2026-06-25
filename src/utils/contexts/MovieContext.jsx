import { createContext, useEffect, useState } from "react";
import storage from "../storage";
import { initialState } from "../../constants/initialState";

const MoviesData = createContext();

export const MoviesController = ({ children }) => {
    const [library, setLibrary] = useState(() => {
        const retriveStorage = storage("cine-log");

        return retriveStorage ?? initialState;
    });

    // controllers
    const addToList = (listId, movie) => {
        setLibrary((prev) => {
            const id = movie.imdbID;

            return {
                movies: {
                    ...prev.movies,

                    [id]: { ...movie, timestamp: Date.now() },
                },

                lists: {
                    ...prev.lists,

                    [listId]: {
                        ...prev.lists[listId],
                        movieIds: [id, ...prev.lists[listId].movieIds],

                        //movieIds: Array.from(new Set([id, ...prev.lists[listId].movieIds])),
                    },
                },
            };
        });
    };

    // lookup function
    const getMovies = (listId) => {
        const { movies, lists } = library;

        const { movieIds } = lists[listId];

        return movieIds.map((id) => {
            return movies[id];
        });
    };

    const removeFromList = (listId, id) => {
        setLibrary((prev) => {
            const movies = { ...prev.movies };
            delete movies[id];

            return {
                movies,

                lists: {
                    ...prev.lists,

                    [listId]: {
                        ...prev.lists[listId],

                        movieIds: prev.lists[listId].movieIds.filter((movieId) => {
                            return movieId !== id;
                        }),
                    },
                },
            };
        });
    };

    const moveMovie = (src, target, id, rating, note) => {
        setLibrary((prev) => {
            return {
                movies: {
                    ...prev.movies,

                    [id]: { ...prev.movies[id], rating, note },
                },

                lists: {
                    ...prev.lists,

                    [src]: {
                        ...prev.lists[src],

                        movieIds: prev.lists[src].movieIds.filter((movieId) => {
                            return movieId !== id;
                        }),
                    },

                    [target]: {
                        ...prev.lists[target],

                        movieIds: [id, ...prev.lists[target].movieIds],
                    },
                },
            };
        });
    };

    const updateTags = (id, tag) => {
        setLibrary((prev) => {
            return {
                movies: {
                    ...prev.movies,

                    [id]: { ...prev.movies[id], customTags: tag },
                },

                lists: {
                    ...prev.lists,
                },
            };
        });
    };

    const addNewList = (name) => {
        const id = name.split(" ").join("").toLowerCase();

        setLibrary((prev) => {
            return {
                movies: {
                    ...prev.movies,
                },

                lists: {
                    ...prev.lists,

                    [id]: { id, name, movieIds: [] },
                },
            };
        });
    };

    useEffect(() => {
        localStorage.setItem("cine-log", JSON.stringify(library));
    }, [library]);

    return (
        <MoviesData.Provider value={{ library, addToList, getMovies, removeFromList, moveMovie, updateTags, addNewList }}>
            {children}
        </MoviesData.Provider>
    );
};

export default MoviesData;
