import { useAuth } from './AuthContext';
import Login from './components/Login';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  const { token, userId } = useAuth();

  return (
    <div className="p-4 max-w-sm mx-auto">
      {token && userId ? <Welcome /> : <Login />}
    </div>
  );
};

export default App;
