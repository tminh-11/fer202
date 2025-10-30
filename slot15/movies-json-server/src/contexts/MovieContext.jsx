import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const response = await movieApi.get('/movies');
      dispatch({ type: 'SET_MOVIES', payload: response.data });
    } catch (error) {
      console.error('Lỗi tải danh sách phim:', error);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, [dispatch]);

  const confirmDelete = useCallback(
    async (id) => {
      dispatch({ type: 'CLOSE_DELETE_MODAL' });
      dispatch({ type: 'START_LOADING' });
      try {
        await movieApi.delete(`/movies/${id}`);
        fetchMovies();
      } catch (error) {
        console.error('Lỗi khi xóa phim:', error);
        fetchMovies();
      }
    },
    [fetchMovies]
  );

  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditing, isEditingId) => {
      dispatch({ type: 'START_LOADING' });
      try {
        if (isEditing) {
          await movieApi.put(`/movies/${isEditingId}`, dataToSend);
        } else {
          await movieApi.post('/movies', dataToSend);
        }
        dispatch({ type: 'RESET_FORM' });
        fetchMovies();
        return true;
      } catch (error) {
        console.error('Lỗi CREATE/UPDATE:', error);
        fetchMovies();
        return false;
      }
    },
    [fetchMovies]
  );

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const dispatchValue = { dispatch, fetchMovies, confirmDelete, handleCreateOrUpdate };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
