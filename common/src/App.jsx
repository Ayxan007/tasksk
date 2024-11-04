import React, { useReducer } from 'react';

const initialState = {
  username: '',
  email: '',
  password: '',
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: '',
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR_ERROR' });

    if (state.username.length < 3) {
      dispatch({ type: 'SET_ERROR', error: 'İstifadəçi adı ən azı 3 hərfdən ibarət olmalıdır' });
      return;
    }

    if (!validateEmail(state.email)) {
      dispatch({ type: 'SET_ERROR', error: 'E-mail düzgün deyil' });
      return;
    }

    if (state.password.length < 3) {
      dispatch({ type: 'SET_ERROR', error: 'Şifrə ən azı 3 simvoldan ibarət olmalıdır' });
      return;
    }

    alert('Form uğurla təsdiqləndi!');
    dispatch({ type: 'RESET_FORM' });
  };

  const handleChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>İstifadəçi adı:</label>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>E-mail:</label>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Şifrə:</label>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
      </div>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      <button type="submit">Göndər</button>
    </form>
  );
}

export default App;
