import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name: 'players',
    initialState: { players: [] },
    reducers: {
        addPlayer: (state, action) => {
            if (state.players.length < 4) {
                state.players.push(action.payload)
            }
        },
        removePlayer: (state, action) => {
            state.players = state.players.filter(player => player.id != action.payload.id)
        }
    }
})

export const { addPlayer, removePlayer } = playerSlice.actions;
export default playerSlice.reducer;