import {Dispatch} from 'react'
import { User } from '../../models/Model';

export interface UpdateLoginInfo{
    readonly type: 'ON_UPDATE_LOGIN_INFO',
    payload: User
}

export interface UserErrorAction{
    readonly type: 'ON_USER_ERROR',
    payload: any
}

export type UserAction = UpdateLoginInfo | UserErrorAction

export const onUpdateLoginInfo = (user : User) => {

    return async (dispatch : Dispatch<UserAction>) => {
        try{
            dispatch({
                type: 'ON_UPDATE_LOGIN_INFO',
                payload: user
            })
        }
        catch(error){
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }

}