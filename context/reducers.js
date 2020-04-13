import React from "react";
export const ContextApp = React.createContext();

export const initialState = []

export const testReducer = (state, action) => {
    switch(action.type) {
        case 'addNote':
            return [
                ...state, action.payload
            ];
        case 'deleteNote':
            return state.filter(note => note.id !== action.payload);
        default:
            return state
    }
};