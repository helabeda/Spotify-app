import Footer from "./Footer";
import Body from "./Body";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/spotifyService/api";

interface SpotifyProps {
  token: string;
}

const Spotify = ({ token }: SpotifyProps) => {
  const {
    data: user,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["spotifyUser", token],
    queryFn: () => getCurrentUser(token),
  });

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  if (!isSuccess || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Container">
      <div className="spotify__body">
        <Sidebar token={token} userId={user.id} />
        <div className="body">
          <Navbar token={token} />
          <div className="body__contents">
            <Body token={token} />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer token={token} />
      </div>
    </div>
  );
};

export default Spotify;
