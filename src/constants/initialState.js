/* using normalized data model */

export const initialState = {
    movies: {},
    lists: {
        watchlist: {
            id: "watchlist",
            name: "Watchlist",
            movieIds: [],
        },
        watchedlog: {
            id: "watchedlog",
            name: "Watched Log",
            movieIds: [],
        },
    },
};
