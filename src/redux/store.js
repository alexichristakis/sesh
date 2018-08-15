import { createStore, applyMiddleware } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

/* DEV */
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
	key: "root",
	storage
};

/* root reducer */
import seshApp from "./reducers";

const persistedReducer = persistReducer(persistConfig, seshApp);

/* create redux store */
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
