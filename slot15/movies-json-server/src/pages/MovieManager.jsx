import React from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import HeaderBar from '../components/HeaderBar';

const MovieManagerContent = () => (
  <>
    <HeaderBar />
    <Container>
      <MovieForm />
      <MovieTable />
    </Container>
  </>
);

const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;
