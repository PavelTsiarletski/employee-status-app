import { ToastContainer } from 'react-toastify';
import { EmployeesPage } from './pages';

function App() {
  return (
    <>
      <EmployeesPage />
      {import.meta.env.DEV && <ToastContainer />}
    </>
  );
}

export default App;
