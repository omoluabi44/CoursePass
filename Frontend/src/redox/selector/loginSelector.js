import {createSelector} from "reselect";


export const selectIsUserLoggedIn = (state) => state.login.isUserLoggedIn
  


export const selectToken = (state) => state.login.token

  

export const selectLoading = (state) => state.login.loading;
export const selectError = (state) => state.login.error;  

export const selectisAuthenticated = createSelector(
    [selectIsUserLoggedIn, selectToken],
    (isUserLoggedIn, token) => {
        
        
       console.log(token);
       
        
        return isUserLoggedIn && !!token;
    }
);