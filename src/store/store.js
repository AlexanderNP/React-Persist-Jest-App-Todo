import { configureStore, combineReducers} from '@reduxjs/toolkit';
import { persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tasksReducer from './tasksSlice';
import themeReducer from './themeSlice'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    theme: themeReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['tasks', 'theme']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })  
});

export const persistor = persistStore(store);
export default store;