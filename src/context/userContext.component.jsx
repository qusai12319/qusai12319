import React, { createContext,  useEffect,useReducer } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// create a context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
export const USER_ACTION_TYPES={
  SET_CURRENT_USER:"SET_CURRENT_USER"
  
}
const userReducer=(state,action)=>{
  const{type,payload}=action
  
  switch(type){
   case USER_ACTION_TYPES.SET_CURRENT_USER :
    return{
        ...state,currentUser:payload
    }
 
    default:
      throw new Error("un handeled typ")

  }
}
const INITIAL_STATE={
  currentUser:null

}
// create a context provider component
export const UserContextProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const[{currentUser},dispatch]=useReducer(userReducer,INITIAL_STATE)

  const setCurrentUser=(user)=>{
  dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user})
  }



  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe; // cleanup
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
