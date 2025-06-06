import { Outlet } from 'react-router-dom';

import Devbar from '@/components/Devbar/Devbar';

import { useAuthContext } from './components/AuthProvider';
import Navbar from './components/Navbar';
//this is the app for testing sonarqube with github actions
const App = () => {
  const { token } = useAuthContext();
  return null
  return (
    <>
      <div className='fixed bottom-0 left-0 top-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        {token && <Navbar />}

        <Outlet />
      </div>
    </>
  );
};

export default App;
