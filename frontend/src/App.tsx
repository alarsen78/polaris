import { useAuth } from './AuthContext';
import styles from './App.module.css';
import Login from './components/Login';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  const { token, userId } = useAuth();

  return (
    <>
      <div className={styles.root}>
        <h1 className={styles.center}>POLARIS</h1>
        <h2 className={styles.center}>Design Your Life</h2>
        {token && userId ? <Welcome /> : <Login />}
      </div>
    </>
  );
};

export default App;
