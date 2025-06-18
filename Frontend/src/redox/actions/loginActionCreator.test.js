// redox/actions/__tests__/loginActionCreator.test.js
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  loginUser,
  fakeApiLogin,
} from '../loginActionCreator';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './loginActionTypes';

// Create a mock store with thunk middleware
const mockStore = configureMockStore([thunk]);

// Mock the fakeApiLogin function
jest.mock('./loginActionCreator', () => {
  const originalModule = jest.requireActual('./loginActionCreator');
  return {
    ...originalModule,
    fakeApiLogin: jest.fn(),
  };
});

describe('Login Actions', () => {
  // Test synchronous action creators
  describe('Synchronous Action Creators', () => {
    test('loginRequest returns correct action', () => {
      const expectedAction = { type: LOGIN_REQUEST };
      expect(loginRequest()).toEqual(expectedAction);
    });

    test('loginSuccess returns correct action with user and token', () => {
      const user = { names: 'John Doe', email: 'test@example.com' };
      const token = 'jwt_token_example';
      const expectedAction = {
        type: LOGIN_SUCCESS,
        user,
        token,
      };
      expect(loginSuccess(user, token)).toEqual(expectedAction);
    });

    test('loginFailure returns correct action with error', () => {
      const error = 'Invalid credentials';
      const expectedAction = {
        type: LOGIN_FAILURE,
        error,
      };
      expect(loginFailure(error)).toEqual(expectedAction);
    });

    test('logout returns correct action', () => {
      const expectedAction = { type: LOGOUT };
      expect(logout()).toEqual(expectedAction);
    });
  });

  // Test the loginUser thunk
  describe('loginUser Thunk', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
      fakeApiLogin.mockReset(); // Reset mock state before each test
    });

    test('dispatches LOGIN_SUCCESS on successful login', async () => {
      const response = {
        user: { names: 'John Doe', email: 'test@example.com' },
        token: 'jwt_token_example',
      };
      fakeApiLogin.mockResolvedValue(response);

      const expectedActions = [
        { type: LOGIN_REQUEST },
        { type: LOGIN_SUCCESS, user: response.user, token: response.token },
      ];

      await store.dispatch(loginUser('test@example.com', 'password'));
      expect(fakeApiLogin).toHaveBeenCalledWith('test@example.com', 'password');
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('dispatches LOGIN_FAILURE on failed login', async () => {
      const error = new Error('Invalid credentials');
      fakeApiLogin.mockRejectedValue(error);

      const expectedActions = [
        { type: LOGIN_REQUEST },
        { type: LOGIN_FAILURE, error: error.message },
      ];

      await store.dispatch(loginUser('wrong@example.com', 'wrong'));
      expect(fakeApiLogin).toHaveBeenCalledWith('wrong@example.com', 'wrong');
      expect(store.getActions()).toEqual(expectedActions);
    });

    test('calls fakeApiLogin with correct arguments', async () => {
      const email = 'test@example.com';
      const password = 'password';
      fakeApiLogin.mockResolvedValue({
        user: { names: 'John Doe', email },
        token: 'jwt_token_example',
      });

      await store.dispatch(loginUser(email, password));
      expect(fakeApiLogin).toHaveBeenCalledWith(email, password);
    });
  });
});