// import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Trainee } from './pages/Trainee';
import Theme from './theme';

const App = () => (
  <ThemeProvider theme={Theme}>
    <CssBaseline />
    <Trainee />
  </ThemeProvider>
);

export default App;
