
// console.log("Hello")

// 7. import redux from 'redux' => When using in our app
// since we are using in node, we use 'require'
const redux = require('redux')
// Middleware redux logger required
const reduxLogger = require('redux-logger')

// 8. Create redux store
const createStore = redux.createStore
const combineReducers = redux.combineReducers

// Apply middleware
const applyMiddleWare = redux.applyMiddleware

// Using .createLogger() to create the logger
const logger = reduxLogger.createLogger()



// 1. Describing the type of action
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICE_CREAM'



// 2. Describing the action - 
// {
//     type: BUY_CAKE,
//     info: 'First action'
// }



// 3. Action creator - It simply creates an action
// A function that returns an action
function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First action'
    }
}

function buyIcecream(){
    return {
        type:BUY_ICECREAM
    }
}


// 4. Reducer - (prev state, action) => new state

// 5. State - initial state, in reducer function, first argument
// is the initial state of our application
// const initialState = {
//     numberOfCakes: 10,
//     numberOfIcecreams : 20
// }

const initialStateCake = {
    numberOfCakes: 30
}

const initialIcecream = {
    numberOfIcecreams: 40
}

// 6. Reducer function - 
const reducerFxn = (state = initialState, action) => {
    switch(action.type){
        case BUY_CAKE:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }
        case BUY_ICECREAM:
            return {
                ...state,
                numberOfIcecreams: state.numberOfIcecreams - 1
            }
        
            default:
                return state
    }
}

const reducerCake = (state = initialStateCake, action)=>{
    switch(action.type){
        case BUY_CAKE:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }
        default:
            return state
    }
}

const reducerIcecream = (state = initialIcecream,action)=>{
    switch(action.type){
        case BUY_ICECREAM:
            return {
                ...state,
                numberOfIcecreams: state.numberOfIcecreams - 1
            }
        default:
            return state
    }
}

// 9. Creating store from store instance - this function takes
// reducer function as an argument
// const store = createStore(reducerFxn)

// For combining reducers - use combineReducers
// Also, when we dispatch an action, both reducer function receive
// that action, its just that only with correct matching action.type
// gets executed
const rootReducer = combineReducers({
    cake: reducerCake,
    icecream: reducerIcecream
})
const store = createStore(rootReducer, applyMiddleWare(logger))

// 10. getState() - gives access to state object
console.log("Initial state " , store.getState())


// 11. Subscribe - subscribe to app, registers listener via subscribe
// takes a function as argument
// Also, this subscribe method returns a function which then
// can be used to unsubscribe from the app
const unsubscribe = store.subscribe(() => console.log('Updated state ', store.getState()))

// 12. Dispatch method to store the state - takes action as argument
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
// 13. Call unsubscribe method -
unsubscribe();