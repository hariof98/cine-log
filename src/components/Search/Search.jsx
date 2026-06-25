import { useContext, useEffect, useState } from "react";
import useDebounce from "../../utils/custom-hooks/useDebounce";
import MoviesData from "../../utils/contexts/MovieContext";

const Search = ({ onResults }) => {
    const [input, setInput] = useState("");

    const { library } = useContext(MoviesData);

    // duplicates detection
    const checkData = (data) => {
        const { movies } = library;

        let idLog = new Set(Object.keys(movies));

        return data.map((val) => {
            if (idLog.has(val?.imdbID)) {
                const copy = { ...val, isAdded: true };

                return copy;
            } else {
                return val;
            }
        });
    };

    const makeRequest = async (value) => {
        try {
            const request = await fetch(`${process.env.OMDB_API}?apikey=${process.env.OMDB_API_KEY}&s=${value}`);

            if (request.ok && request.status === 200) {
                const response = await request.json();

                if (response.Response === "True") {
                    const evaluate = checkData(response?.Search);

                    onResults(evaluate);
                } else {
                    throw new Error(`Error: ${response.Error}`);
                }
            } else {
                throw new Error(`Something went wrong: ${request.status}`);
            }
        } catch (err) {
            onResults([]);

            console.error(err);
        }
    };

    const debounce = useDebounce(makeRequest);

    useEffect(() => {
        if (input) {
            debounce(input);
        } else {
            onResults([]);
        }
    }, [input]);

    useEffect(() => {
        if (input) {
            setInput("");
        }
    }, [library]);

    return (
        <div className="search-input">
            <label htmlFor="movies">Search by title</label>

            <input
                value={input}
                id="movies"
                type="text"
                placeholder="Search for movies or series..."
                onChange={(e) => {
                    setInput(e.target.value);
                }}
            />
        </div>
    );
};

export default Search;
