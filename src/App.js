import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Navigation from './components/Navigation';
import AutomationsList from './components/AutomationsList';
import AutomationBuilder from './components/AutomationBuilder';
import GlobalStyles from './GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<AutomationsList />} />
          <Route path="/automation/new" element={<AutomationBuilder />} />
          <Route path="/automation/:id" element={<AutomationBuilder />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 