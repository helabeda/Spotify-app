import { spotifyConfig } from "./config";

export const authenticateWithSpotify = () => {
  const { clientId, redirectUri, authEndpoint } = spotifyConfig;
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
  ];
  window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope.join(
    " "
  )}&response_type=token&show_dialog=true`;
};

// Fetch function for get Current User
export const getCurrentUser = async (token: string) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

// Fetch function for get User Playlists
export const getUserPlaylists = async (token: string) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,

        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch playlists: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    return data.items.map(({ name, id }: { name: string; id: string }) => ({
      name,
      id,
    }));
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
};

// Fetch function for Playlist By Id
export const getPlaylistById = async (token: string) => {
  const playlistId = "37i9dQZF1Fa1IIVtEpGUcU";
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error fetching playlist data:", errorData.error.message);
    throw new Error("Error fetching playlist data");
  }

  const data = await response.json();

  return data;
};

interface PlayTrackParams {
  id: string;
  context_uri: string;
  track_number: number;
  token: string;
}

// Fetch function for play track
export const playTrackMutation = async ({
  id,
  context_uri,
  track_number,
  token,
}: PlayTrackParams) => {
  const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      context_uri,
      offset: {
        position: track_number - 1,
      },
      position_ms: 0,
    }),
  });

  if (!response.ok) {
    throw new Error("Error playing track");
  }
};

// Fetch function for Current Track
export const getCurrentTrack = async (token: string) => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  if (response.ok) {
    try {
      const rawData = await response.text();
      const data = rawData ? JSON.parse(rawData) : null;

      return data;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  } else {
    console.error(
      "Error fetching current track:",
      response.status,
      response.statusText
    );
    return null;
  }
};

// Fetch function for changing player state
export const changePlayerState = async (
  token: string,
  playerState: boolean
) => {
  const state = playerState ? "pause" : "play";
  const response = await fetch(
    `https://api.spotify.com/v1/me/player/${state}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error("Failed to change player state:", errorMessage);
    throw new Error("Failed to change player state");
  }

  return { success: true };
};

// Fetch function for changing track
export const changeTrack = async (token: string, type: string) => {
  await fetch(`https://api.spotify.com/v1/me/player/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

interface SetVolumeParams {
  token: string;
  volumePercent: number;
}

// Fetch function for Volume track
export const setVolume = async ({
  token,
  volumePercent,
}: SetVolumeParams): Promise<void> => {
  const response = await fetch("https://api.spotify.com/v1/me/player/volume", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      volume_percent: volumePercent,
    }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to set volume: ${errorMessage}`);
  }
};
