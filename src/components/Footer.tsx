import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";

const Footer = ({ token }: { token: string }) => {
  return (
    <div className="h-full w-full  bg-[#181818] grid grid-cols-[1fr_2fr_1fr] items-center justify-center px-4 py-0 border-t-[#282828] border-t border-solid">
      <CurrentTrack token={token} />
      <PlayerControls token={token} />
      <Volume token={token} />
    </div>
  );
};

export default Footer;
