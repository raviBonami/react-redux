
// Requiring redux
const redux = require('redux')
const createStore = redux.createStore

// Requiring thunk
const thunkMiddleware = require('redux-thunk').default

// Require axios
const axios = require('axios')

// Get middleware
const applyMiddleware = redux.applyMiddleware 

// Initial state
const initialState = {
    loading: false,
    users: [],
    error:''
}


// Declaring constants for action type
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"


// Action creators
const fetchUsersRequest = () => {
    return {
        type:FETCH_USERS_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUserFailure = (err) => {
    return {
        type:FETCH_USERS_FAILURE,
        payload: err
    }
}

const reducerFxn  = (state = initialState,action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                // ...state,
                loading:false,
                users:action.payload,
                error:''
            }

        case FETCH_USERS_FAILURE:
            return {
                // ...state,
                loading:false,
                users:[],
                error:action.payload
            }
    }
}


// Fetch users - Action creator
// Normally this returns an action in form of object
// But thunk allows us to return an action as function
const fetchUsers = () => {
    // This function is allowed to have API calls
    // Receives dispatch method as argument
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
            // res.data is array of users
            const users = res.data.map((user) => user.id)
            dispatch(fetchUserSuccess(users))
        })
        .catch((err) => {
            // err.message gives description of error
            dispatch(fetchUserFailure(err.message))
        })
    }
}

const store = createStore(reducerFxn, applyMiddleware(thunkMiddleware))

const unsubscribe = store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers)