import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from '../reducers';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
 
};

const middlewares = [ReduxThunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middlewares)),
);

export const persistedStore = persistStore(store);
