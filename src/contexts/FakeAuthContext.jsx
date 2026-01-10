import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'longout':
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error('unknown action');
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvaider({ children }) {
  const [{ user, isAuthenticated }, despatch] = useReducer(
    reducer,
    initialState,
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      despatch({ type: 'login', payload: FAKE_USER });
    }
  }

  function longOut() {
    despatch({ type: 'longout' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, longOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error(`Cities context used outside the AuthContext`);
  return context;
}

export { AuthContext, useAuth };
