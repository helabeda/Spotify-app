import { getUserPlaylists } from "@/lib/spotifyService/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import React, { useState } from "react";

interface Playlist {
  name: string;
  id: string;
}

interface SpotifyProps {
  token: string;
  userId: string;
}

const PlayList = ({ token, userId }: SpotifyProps) => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  const {
    data: playlists,
    isSuccess,
    isError,
  } = useQuery<Playlist[], Error>({
    queryKey: [QUERY_KEYS.SET_PLAYLISTS, userId, token],
    queryFn: () => getUserPlaylists(token),
  });

  if (isError) {
    return <div>Error fetching playlists</div>;
  }

  if (!isSuccess || !playlists) {
    return <div>Loading...</div>;
  }

  const handleChangePlaylist = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
  };
  
  return (
    <div className="playList text-[#b3b3b3] h-full overflow-hidden">
      <h1>Your Playlists</h1>
      <ul className="list-none flex flex-col gap-4 h-[45vh] max-h-full overflow-auto p-4">
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            onClick={() => handleChangePlaylist(playlist.id)}
            className={`transition-[0.3s] duration-[ease-in-out] cursor-pointer hover:text-[white] ${
              selectedPlaylistId === playlist.id ? "text-white" : ""
            }`}
          >
            {playlist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayList;
