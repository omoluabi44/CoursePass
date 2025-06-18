import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
  } from '../actions/loginActionTypes';
  import { loginReducer, initialState } from './loginReducer';
  
  describe('loginReducer', () => {
    // Test initial state
    test('should return initial state when no action is provided', () => {
      expect(loginReducer(undefined, {})).toEqual(initialState);
    });
  
    // Test LOGIN_REQUEST
    test('should handle LOGIN_REQUEST action', () => {
      const action = { type: LOGIN_REQUEST };
      const expectedState = {
        ...initialState,
        loading: true,
        error: null,
      };
      expect(loginReducer(initialState, action)).toEqual(expectedState);
    });
  
    // Test LOGIN_SUCCESS
    test('should handle LOGIN_SUCCESS action', () => {
      const token = { accessToken: 'abc123' };
      const action = { type: LOGIN_SUCCESS, token };
      const expectedState = {
        ...initialState,
        loading: false,
        isUserLoggedIn: true,
        token,
      };
      expect(loginReducer(initialState, action)).toEqual(expectedState);
    });
  
    // Test LOGIN_FAILURE
    test('should handle LOGIN_FAILURE action', () => {
      const error = 'Invalid credentials';
      const action = { type: LOGIN_FAILURE, error };
      const expectedState = {
        ...initialState,
        loading: false,
        error,
      };
      expect(loginReducer(initialState, action)).toEqual(expectedState);
    });
  
    // Test LOGOUT
    test('should handle LOGOUT action', () => {
      // Start with a logged-in state to simulate logout
      const loggedInState = {
        ...initialState,
        isUserLoggedIn: true,
        token: { accessToken: 'abc123' },
      };
      const action = { type: LOGOUT };
      const expectedState = {
        ...initialState,
        isUserLoggedIn: false,
        token: null,
      };
      expect(loginReducer(loggedInState, action)).toEqual(expectedState);
    });
  
    // Test default case with unknown action
    test('should return current state for unknown action', () => {
      const currentState = {
        ...initialState,
        isUserLoggedIn: true,
        token: { accessToken: 'abc123' },
      };
      const action = { type: 'UNKNOWN_ACTION' };
      expect(loginReducer(currentState, action)).toEqual(currentState);
    });
  });