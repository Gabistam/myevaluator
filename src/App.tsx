import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;