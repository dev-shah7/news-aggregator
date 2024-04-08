import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './app/components/Home';
import Header from './app/components/Header';
import NotFound from './app/components/NotFound';

function App() {
  return (
    <div className='min-h-full'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
