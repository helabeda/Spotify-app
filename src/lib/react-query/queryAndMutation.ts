import { useQuery } from "@tanstack/react-query";
import { getCurrentTrack, getPlaylistById } from "../spotifyService/api";
import { QUERY_KEYS } from "./queryKeys";

export const getTokenFromHash = (hash: string): string | null => {
  const params = new URLSearchParams(hash.substring(1));
  return params.get("access_token") || null;
};

export const getUserById = async (userId: string, token: string) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error();
    }

    const user = await response.json();

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const usePlaylistById = (token: string) => {
  const playlistId = "37i9dQZF1Fa1IIVtEpGUcU";
  const result = useQuery({
    queryKey: [QUERY_KEYS.SET_PLAYLIST_ID, playlistId],
    queryFn: () => getPlaylistById(token),
    enabled: !!token,
  });

  return result;
};

export const useCurrentTrack = (token: string) => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.SET_PLAYING, "currentTrack", token],
    queryFn: () => getCurrentTrack(token),
    enabled: !!token,
  });
  return result;
};

export const useGetCurrentTrack = (token: string) => {
  const result = useQuery({
    queryKey: [QUERY_KEYS.SET_PLAYER_STATE, "playerState", token],
    queryFn: () => getCurrentTrack(token),
    enabled: !!token,
  });
  return result;
};
