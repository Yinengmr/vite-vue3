import { createStore } from 'vuex'
import { IUserState } from './modules/user'

export interface IRootState {
	user: IUserState
}

export default createStore<IRootState>({})