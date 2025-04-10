import { ToastContainer } from 'react-toastify';
import { EmployeesPage } from './module/employees';
import './index.css';
import { Layout } from './layouts/Layout';

function App() {
  return (
    <Layout>
      <EmployeesPage />
      {import.meta.env.DEV && <ToastContainer />}
    </Layout>
  );
}

export default App;
