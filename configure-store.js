import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store'


export default (initialState) => {
    let middlewares = [thunk]
    let store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(...middlewares)
        )
    )

    return store
}
