// Configuración del store
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        /* Otros middleware */
    ),
})