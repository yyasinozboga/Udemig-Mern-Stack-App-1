import React, { useState } from "react";
import { IPost } from "../models/data";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiOutlineRefresh } from "react-icons/hi";
import { deletePost, editPost } from "../store/actions/postActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { ModalType } from "../pages/home";

type Props = {
  post: IPost;
  setModal: React.Dispatch<React.SetStateAction<ModalType>>;
};

const Post: React.FC<Props> = ({ post, setModal }) => {
  const { _id, username, title, description } = post;
  const dispatch = useDispatch<AppDispatch>();

  const newDescription =
    description.length > 50 ? description.slice(0, 50) : description;

  const handleClick = () => {
    dispatch(deletePost(_id as string));
  };

  return (
    <div className="rounded-lg border border-gray-300 p-2 relative">
      <h3 className="font-bold text-2xl">{title}</h3>
      <p className="text-gray-500">{newDescription}</p>
      <small className="text-gray-500">{username}</small>

      <div className="flex absolute -top-4 -right-5 gap-3 items-center">
        <button
          onClick={handleClick}
          className="bg-red-500 p-2 rounded-full cursor-pointer"
        >
          <FaRegTrashCan className="size-5" />
        </button>

        <button
          onClick={() => setModal({ isOpen: true, post })}
          className="bg-red-500 p-2 rounded-full cursor-pointer"
        >
          <HiOutlineRefresh className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default Post;
