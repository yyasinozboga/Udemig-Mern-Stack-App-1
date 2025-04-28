import React from "react";
import { SlLogout } from "react-icons/sl";
import { ModalType } from ".";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { logout } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

type Props = {
  setModal: React.Dispatch<React.SetStateAction<ModalType>>;
};

const Header: React.FC<Props> = ({ setModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = async () => {
    const token = await dispatch(logout()).unwrap();
    if (!token) {
      navigate("/auth");
    }
  };

  return (
    <header className="bg-indigo-600 p-5 flex justify-between items-center">
      <h1 className="text-white font-bold text-2xl uppercase">Share Post</h1>
      <div className="flex gap-8">
        <input
          type="text"
          required
          className="input bg-white"
          placeholder="Search"
        />

        <button
          onClick={() => setModal({ isOpen: true })}
          className="py-2 px-8 rounded-lg border-[1px] border-black shadow-xl text-white cursor-pointer"
        >
          Create Post
        </button>

        <button onClick={handleClick} className="cursor-pointer">
          <SlLogout className="size-6 text-white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
