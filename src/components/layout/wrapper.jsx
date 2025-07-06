import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const Wrapper = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Wrapper;
