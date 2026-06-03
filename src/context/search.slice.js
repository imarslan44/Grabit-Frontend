import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: "",
    loading: false,
    error: null,
    results: [],
}

const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setResults: (state, action) => {
            state.results = action.payload;
        }
    }
});

export const { setQuery, setLoading, setError, setResults } = SearchSlice.actions;

const SearchReducer = SearchSlice.reducer;
export default SearchReducer;