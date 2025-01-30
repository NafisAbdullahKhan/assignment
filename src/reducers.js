import { createSlice } from '@reduxjs/toolkit';
import { ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, SET_CONTACTS, SET_CONTACT } from './actions';

const initialState = [];

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ADD_CONTACT, (state, action) => {
                state.push({ id: state.length + 1, ...action.payload });
            })
            .addCase(UPDATE_CONTACT, (state, action) => {
                const index = state.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(DELETE_CONTACT, (state, action) => {
                return state.filter(contact => contact.id !== action.payload);
            })
            .addCase(SET_CONTACTS, (state, action) => {
                return action.payload;
            })
            .addCase(SET_CONTACT, (state, action) => {
                const index = state.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                } else {
                    state.push(action.payload);
                }
            });
    }
});

export default contactsSlice.reducer;