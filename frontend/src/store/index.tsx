import { combineReducers, configureStore } from '@reduxjs/toolkit';
import adminSlice, { AdminState } from '@/store/slices/adminSlice';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import clientSlice, { ClientState } from './slices/clientSlice';

const persistConfig = {
    key: CONFIG.appName,
    storage,
};

const rootReducer = combineReducers({
    admin: adminSlice,
    client: clientSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = {
    admin: AdminState;
    client: ClientState
};
export type AppDispatch = typeof store.dispatch;
