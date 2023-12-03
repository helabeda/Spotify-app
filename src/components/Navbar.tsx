import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/spotifyService/api";
import { useNavigate } from "react-router-dom";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

interface NavbarProps {
  token: string;
}

const Navbar = ({ token }: NavbarProps) => {
  const navigate = useNavigate();

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

  const goBack = () => {
    if (hasPreviousPage()) {
      navigate(-1);
    }
  };

  const goForward = () => {
    if (hasNextPage()) {
      navigate(1);
    }
  };

  const hasPreviousPage = () => {
    return navigate.length > 1;
  };

  const hasNextPage = () => {
    const currentPage = 1;
    const totalPages = 10;

    return currentPage < totalPages;
  };

  const getCursorStyle = (hasPage: boolean) => {
    return hasPage ? "pointer" : "not-allowed";
  };

  const getCursorColor = (hasPage: boolean) => {
    return hasPage ? "white" : "red";
  };

  return (
    <div className="lg:flex flex-row justify-between items-center p-8 h-22 sticky top-0 transition duration-[ease-in-out] bg-[rgba(0,0,0,0.7)]">
      <div className="flex gap-x-4 w-1/3 p-2 ">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={goBack}
            className={`
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-${getCursorStyle(hasPreviousPage())} 
              hover:opacity-75 
              transition
            `}
            style={{ color: getCursorColor(hasPreviousPage()) }}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={goForward}
            className={`
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-${getCursorStyle(hasNextPage())} 
              hover:opacity-75 
              transition
            `}
            style={{ color: getCursorColor(hasNextPage()) }}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="search__bar bg-white p-2 rounded-full flex items-center gap-2">
          <FaSearch />
          <input
            type="text"
            placeholder="Artists, songs, or podcasts"
            className="border-none h-8 lg:w-96 w-80 focus:outline-none"
          />
        </div>
      </div>
      <div className="avatar bg-black p-1.5 pr-4 rounded-full flex justify-center items-center w-44 h-12">
        {isSuccess && (
          <a
            href={user.external_urls.spotify}
            className="flex justify-center items-center gap-2 text-white font-bold"
          >
            <CgProfile />
            <span>{user.display_name}</span>
          </a>
        )}
        {isError && <span>Error fetching user data</span>}
      </div>
    </div>
  );
};

export default Navbar;
