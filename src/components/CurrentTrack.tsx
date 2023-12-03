import { useCurrentTrack } from "@/lib/react-query/queryAndMutation";

interface CurrentTrackProps {
  token: string;
}

interface CurrentTrackProps {
  data: {
    item: {
      id: string;
      name: string;
      artists: Array<{ name: string }>;
      album: {
        name: string;
        images: Array<{ url: string }>;
      };
    };
    progress_ms: number;
    is_playing: boolean;
  } | null;
}

const CurrentTrack = ({ token }: CurrentTrackProps) => {
  const { data, isLoading, isError } = useCurrentTrack(token);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching current track</div>;
  }

  if (!data) {
    return <div>No current track playing</div>;
  }

  const { item, progress_ms, is_playing } = data;
  const { name, artists, album } = item;

  return (
    <div className="flex items-center gap-4">
      <div className="track__image">
        <img src={album.images[2].url} alt="Album Cover" />
      </div>
      <div className="flex flex-col gap-[0.3rem]">
        <h4 className="text-[white]">{album.name}</h4>
        <h6 className="text-[#b3b3b3]">
          {artists.map((artist) => artist.name).join(", ")}
        </h6>
        <p className="text-[#b3b3b3]"> {is_playing ? "Play" : "Pause"}</p>
      </div>
    </div>
  );
};

export default CurrentTrack;
