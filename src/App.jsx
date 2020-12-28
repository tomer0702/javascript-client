// import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { Trainee } from './pages/Trainee';
import Theme from './theme';

const App = () => (
  <ThemeProvider theme={Theme}>
    <Trainee />
  </ThemeProvider>
);

export default App;
