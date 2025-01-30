import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ContactManager from './components/ContactManager';
import ContactDetail from './components/ContactDetail';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ContactManager />} />
          <Route path="/contact-detail/:id" element={<ContactDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;