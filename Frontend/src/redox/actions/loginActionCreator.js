import axios from 'axios';

// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';

// Action Creators
export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(token, user) {
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: LOGIN_SUCCESS,
    token,
    user,
  };
}

export function updateAccessToken(accessToken) {
  return {
    type: UPDATE_ACCESS_TOKEN,
    accessToken,
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {
    type: LOGOUT,
  };
}

// Thunks
export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await apiLogin(email, password);
      const { tokens, user } = response;
      dispatch(loginSuccess(tokens, user));
      return tokens;
    } catch (error) {
      dispatch(loginFailure(error.message));
      // Let the component decide how to show errors (e.g. PopUp)
      throw error;
    }
  };
};

// API call
const apiLogin = async (username, password) => {
  try {
    const response = await axios.post('https://api.coursepass.me/api/v1/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.log(error);
    
    const isAxiosError = axios.isAxiosError(error);
    const errorMessage = isAxiosError
      ? error.response?.data?.error || error.message
      : 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

// Load from localStorage
export const initializeAuth = () => (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      const parsedToken = JSON.parse(token);
      const parsedUser = JSON.parse(user);
      if (parsedToken) {
        dispatch(loginSuccess(parsedToken, parsedUser));
      } else {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  } catch (error) {
    console.error('Failed to load or parse token from localStorage:', error);
    dispatch(logout());
  }
};
