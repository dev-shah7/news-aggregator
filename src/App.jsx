import Footer from './app/components/Footer';
import Header from './app/components/Header';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer className='sticky bottom-0' />
    </div>
  );
}

export default App;
