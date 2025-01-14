import {createSlice} from '@reduxjs/toolkit';

// Obtener la lista de compra en localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('shoppingList');

        if(serializedState === null){
            return [];
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
}

// Guardar la lista de compra en localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);

        localStorage.setItem('shoppingList', serializedState);

    } catch (err) {
        // Handle errors here
        console.error('Error saving state: ', err);
    }
}

const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState: loadState(),
    reducers: {
        addItem: (state, action)=>{
            state.push({
                id: Date.now(),
                name: action.payload,
                inCart: false,
                createAt: new Date().toISOString(), // YYYY-MM-DDTHH:mm:ss.sssZ
            });

            saveState(state);
        },
        toggleInCart: (state, action)=>{
            const item = state.find(item => item.id === action.payload);

            if(item){
                item.inCart = !item.inCart;
                saveState(state);
            }
        },
        removeItem: (state, action)=>{
            const index = state.findIndex(item => item.id === action.payload);

            if(index !== -1){
                state.splice(index, 1);

                saveState(state);
            }
        }
    }
});

export const { addItem, toggleInCart, removeItem } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;