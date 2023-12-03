import { setVolume } from "@/lib/spotifyService/api";
import { useMutation } from "@tanstack/react-query";
import React from "react";

interface VolumeProps {
  token: string;
  volumePercent: number;
}

const Volume = ({ token, volumePercent }: VolumeProps) => {
  const setVolumeMutation = useMutation({
    mutationFn: ({
      token,
      volumePercent,
    }: {
      token: string;
      volumePercent: number;
    }) => setVolume(token, volumePercent),
  });

  const handleVolumeChange = (e: React.MouseEvent) => {
    const newVolumePercent = parseInt(e.target.value, 10);
    setVolumeMutation.mutate({ token, volumePercent: newVolumePercent });
  };

  return (
    <div className="flex items-center lg:justify-end justify-start p-2">
      <input
        type="range"
        min="0"
        max="100"
        onClick={(e) => handleVolumeChange(e)}
        value={volumePercent}
      />
    </div>
  );
};

export default Volume;
