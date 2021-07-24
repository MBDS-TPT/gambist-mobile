import { User } from '../../models/Model'
import {UserAction} from '../actions'

const initialState: User = {
    id: undefined,
    firstname: "",
    lastname: "",
    username: "",
    password: undefined,
    email: "",
    dayOfBirth: undefined,
    state: undefined
}

const UserReducer = (state: User = initialState, action: UserAction) => {
    switch(action.type){
        case 'ON_UPDATE_LOGIN_INFO':
            return{
                ...state,
                id: action.payload.id,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email,
                dayOfBirth: action.payload.dayOfBirth,
                state: action.payload.state,
            }
        default:
            return state;
    }
}

export {UserReducer}