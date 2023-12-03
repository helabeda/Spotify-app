import { usePlaylistById } from "@/lib/react-query/queryAndMutation";
import { playTrackMutation } from "@/lib/spotifyService/api";
import { AiFillClockCircle } from "react-icons/ai";

interface BodyProps {
  token: string;
}

const Body = ({ token }: BodyProps) => {
  const { data: playlist, isLoading, isError } = usePlaylistById(token);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching playlist data</div>;
  }

  const msToMinutesAndSeconds = (ms: number): string => {
    const minutes: number = Math.floor(ms / 60000);
    const seconds: string = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds, 10) < 10 ? "0" : ""}${seconds}`;
  };
  const handleTrackClick = (
    id: string,
    name: string,
    artists: string[],
    image: string,
    context_uri: string,
    track_number: number
  ) => {
    playTrackMutation({ id, context_uri, track_number, token });
  };

  return (
    <>
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="items-center gap-8 mx-8 my-0">
          <div className="image">
            <img
              src={playlist.images[0].url}
              alt="selected playlist"
              className="h-60 lg:h-full"
            />
          </div>
          <div className="h-60 flex flex-col gap-4 text-[#e0dede]">
            <span className="type">PLAYLIST</span>
            <h1 className="text-[white] text-[4rem]">{playlist.name}</h1>
            <p className="text-[white] text-md w-10/12 lg:w-full">
              {playlist.description}
            </p>
          </div>
        </div>
        <div className="list lg:pt-0 pt-14 p-2">
          <div className="grid grid-cols-4 text-gray-200 sticky transition duration-300 ">
            <div className="lg:flex justify-start items-center">
              <span>#</span>
            </div>
            <div className="lg:flex justify-center items-center">
              <span>TITLE</span>
            </div>
            <div className="lg:flex justify-end items-center">
              <span>ALBUM</span>
            </div>
            <div className="lg:flex justify-end items-center">
              <span>
                <AiFillClockCircle />
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-8 mb-20 mt-10">
            {playlist.tracks.items.map((item, index) => (
              <div
                className="grid grid-cols-4 hover:bg-opacity-70 hover:bg-black transition duration-300 text-white p-2"
                key={index}
                onClick={() =>
                  handleTrackClick(
                    item.track.id,
                    item.track.name,
                    item.track.artists.map((artist) => artist.name),
                    item.track.album.images[2].url,
                    item.track.context_uri,
                    item.track.track_number
                  )
                }
              >
                <div className="text-gray-300 lg:flex justify-start items-center">
                  <span>{index + 1}</span>
                </div>
                <div className="lg:flex flex-col justify-center items-center">
                  <div className="lg:flex justify-center items-center">
                    <img
                      src={item.track.album.images[2].url}
                      alt="track"
                      className="h-10 w-10"
                    />
                  </div>
                  <div className="flex flex-col justify-center lg:items-center">
                    <span className="name">{item.track.name}</span>
                    <span className="artists">
                      {item.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </span>
                  </div>
                </div>
                <div className="lg:flex justify-end items-center">
                  <span>{item.track.album.name}</span>
                </div>
                <div className="lg:flex justify-end items-center">
                  <span>{msToMinutesAndSeconds(item.track.duration_ms)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
