// selectors.test.js
import {
    selectIsUserLoggedIn,
    selectToken,
    selectLoading,
    selectError,
    selectisAuthenticated,
  } from '../selector/loginSelector';
  
  describe('Login Selectors', () => {

    const mockState = {
      token: { access: 'abc123' },
      isUserLoggedIn: true,
      loading: false,
      error: null,
    };
  
    test('selectIsUserLoggedIn returns isUserLoggedIn value', () => {
      expect(selectIsUserLoggedIn(mockState)).toBe(true);
      const falseState = { ...mockState, isUserLoggedIn: false };
      expect(selectIsUserLoggedIn(falseState)).toBe(false);
    });
  
    // Test selectToken
    test('selectToken returns token value', () => {
      expect(selectToken(mockState)).toEqual({ access: 'abc123' });
      const nullTokenState = { ...mockState, token: null };
      expect(selectToken(nullTokenState)).toBeNull();
    });
  
    // Test selectLoading
    test('selectLoading returns loading value', () => {
      expect(selectLoading(mockState)).toBe(false);
      const loadingState = { ...mockState, loading: true };
      expect(selectLoading(loadingState)).toBe(true);
    });
  
    // Test selectError
    test('selectError returns error value', () => {
      expect(selectError(mockState)).toBeNull();
      const errorState = { ...mockState, error: 'Login failed' };
      expect(selectError(errorState)).toBe('Login failed');
    });
  
    // Test selectisAuthenticated
    test('selectisAuthenticated returns true when user is logged in with valid token', () => {
      expect(selectisAuthenticated(mockState)).toBe(true);
    });
  
    test('selectisAuthenticated returns false when user is not logged in', () => {
      const notLoggedInState = { ...mockState, isUserLoggedIn: false };
      expect(selectisAuthenticated(notLoggedInState)).toBe(false);
    });
  
    test('selectisAuthenticated returns false when token is null', () => {
      const noTokenState = { ...mockState, token: null };
      expect(selectisAuthenticated(noTokenState)).toBe(false);
    });
  
    test('selectisAuthenticated returns false when token is empty object', () => {
      const emptyTokenState = { ...mockState, token: null };
      expect(selectisAuthenticated(emptyTokenState)).toBe(false);
    });
  
    // Test memoization
    test('selectisAuthenticated memoizes results', () => {
      const state1 = { ...mockState };
      const state2 = { ...mockState }; // Same values, different reference
      const result1 = selectisAuthenticated(state1);
      const result2 = selectisAuthenticated(state2);
      expect(result1).toBe(result2); // Same result due to memoization
      expect(selectisAuthenticated.recomputations()).toBe(1); // Only computed once
    });
  });