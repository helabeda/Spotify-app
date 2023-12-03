import { useQuery } from "@tanstack/react-query";
import { authenticateWithSpotify } from "@/lib/spotifyService/api";
import { Link } from "react-router-dom";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

const Login = () => {
  const { data: token, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.SET_USER],
    queryFn: authenticateWithSpotify,
  });

  if (isSuccess && token !== undefined) {
    return <Link to={`/spotify?token=${token}`} />;
  }
  return (
    <div>
      <h1>Welcome to Your Spotify App</h1>
      <p>Please log in to connect your Spotify account:</p>
      <button onClick={() => window.location.reload()}>
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
