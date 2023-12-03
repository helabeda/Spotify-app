import { MdHomeFilled, MdSearch } from "react-icons/md";
import PlayList from "./PlayList";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

interface SidebarProps {
  userId: string;
  token: string;
}

const Sidebar = ({ userId, token }: SidebarProps) => {
  return (
    <div className="bg-[black] ustify-between text-[#b3b3b3] hidden md:flex flex-col h-full lg:w-full w-64">
      <div className="top__links flex flex-col">
        <div className="logo text-center mx-0 my-4">
          <img src="/assets/Spotify_Logo_RGB_White.png" alt="spotify" />
        </div>

        <div className="list-none flex flex-col gap-4 p-4 bg-[#121212]  m-2 rounded">
          <div className="flex gap-4 cursor-pointer transition-[0.3s] duration-[ease-in-out] hover:text-[white]">
            <MdHomeFilled />
            <span>Home</span>
          </div>
          <div className="flex gap-4 cursor-pointer transition-[0.3s] duration-[ease-in-out] hover:text-[white]">
            <MdSearch />
            <span>Search</span>
          </div>
        </div>

        <div className="bg-[#121212] list-none flex flex-col gap-4 p-4  m-2 rounded">
          <div className=" flex gap-2 cursor-pointer transition-[0.3s] duration-[ease-in-out] hover:text-[white]">
            <TbPlaylist className="mt-1 mr-2" />
            <span>Your Library</span>
            <AiOutlinePlus className="mt-2 ml-4" />
          </div>
          <PlayList token={token} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
