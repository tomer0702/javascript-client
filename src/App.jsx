// import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { ChildrenDemo } from './pages/ChildrenDemo';
import Theme from './theme';

const App = () => (
  <ThemeProvider theme={Theme}>
    <ChildrenDemo />
  </ThemeProvider>
);

export default App;
