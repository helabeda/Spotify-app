import { useGetCurrentTrack } from "@/lib/react-query/queryAndMutation";
import { changePlayerState, changeTrack } from "@/lib/spotifyService/api";
import { useMutation } from "@tanstack/react-query";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";

interface PlayerControlsProps {
  token: string;
}

const PlayerControls = ({ token }: PlayerControlsProps) => {
  const { data: playerData } = useGetCurrentTrack(token);

  const playPauseMutation = useMutation({
    mutationFn: ({
      token,
      playerState,
    }: {
      token: string;
      playerState: boolean;
    }) => changePlayerState(token, playerState),
  });

  const changeTrackMutation = useMutation({
    mutationFn: ({ token, type }: { token: string; type: string }) =>
      changeTrack(token, type),
  });

  const handleTogglePlayPause = async () => {
    try {
      await playPauseMutation.mutateAsync({
        token,
        playerState: !playerData?.isPlaying,
      });
    } catch (error) {
      console.error("Error changing player state:", error);
    }
  };

  const handleChangeTrack = async (type: string) => {
    try {
      await changeTrackMutation.mutateAsync({ token, type });
    } catch (error) {
      console.error("Error changing track:", error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-8">
      <div className="shuffle">
        <BsShuffle className="lg:text-[2rem] text-gray-300 transition-colors duration-200 ease-in-out hover:text-white" />
      </div>
      <div className="previous">
        <CgPlayTrackPrev
          onClick={() => handleChangeTrack("prev")}
          className="lg:text-[2rem] text-gray-300 transition-colors duration-200 ease-in-out hover:text-white"
        />
      </div>

      <div className="state">
        {playerData?.isPlaying ? (
          <BsFillPauseCircleFill
            onClick={handleTogglePlayPause}
            className="lg:text-[2rem] text-gray-300 "
          />
        ) : (
          <BsFillPlayCircleFill
            onClick={handleTogglePlayPause}
            className="lg:text-[2rem] text-gray-300 "
          />
        )}
      </div>

      <div className="next">
        <CgPlayTrackNext
          onClick={() => handleChangeTrack("next")}
          className="lg:text-[2rem] text-gray-300 transition-colors duration-200 ease-in-out hover:text-white"
        />
      </div>
      <div className="repeat">
        <FiRepeat className="text-gray-300 transition-colors duration-200 ease-in-out hover:text-white lg:text-[2rem]" />
      </div>
    </div>
  );
};

export default PlayerControls;
