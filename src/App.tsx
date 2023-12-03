// App.tsx
import './globals.css'
import Login from './components/Login';
import Spotify from './components/Spotify';
import { useLocation } from 'react-router-dom';
import { getTokenFromHash } from './lib/react-query/queryAndMutation';

const App = () => {

  const location = useLocation();
  const token = getTokenFromHash(location.hash);

  return <div>{token ? <Spotify token={token} /> : <Login />}</div>;
};

export default App;
