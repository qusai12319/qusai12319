import {compose,createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducer'
const middleWars=[logger]
const composedEnhancers=compose(applyMiddleware(...middleWars))//middleware is what of them,one of the enhancers
export const store=createStore(rootReducer,undefined,composedEnhancers)