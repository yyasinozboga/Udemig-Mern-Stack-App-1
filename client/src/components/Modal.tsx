import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addPost, editPost } from "../store/actions/postActions";
import { ModalType } from "../pages/home";

type Props = {
  modal: ModalType;
  setModal: React.Dispatch<React.SetStateAction<ModalType>>;
};

const Modal: React.FC<Props> = ({ setModal, modal }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const values = Object.fromEntries(new FormData(form).entries());

    const { username, description, title } = values;

    if (modal.post) {
      dispatch(
        editPost({
          username: username as string,
          description: description as string,
          title: title as string,
          _id: modal.post._id,
        }),
      );
    } else {
      dispatch(
        addPost({
          username: username as string,
          description: description as string,
          title: title as string,
        }),
      );
    }

    setModal({ isOpen: false });
  };

  return (
    <div className="w-full h-screen bg-black/50 fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div className="w-lg py-1 px-3 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl uppercase">
            {modal.post ? "Edit" : "Share"} Post
          </h1>
          <button
            onClick={() => setModal({ isOpen: false })}
            className="cursor-pointer"
          >
            <IoCloseOutline className="text-black size-10" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-3">
          <input
            type="text"
            className="input"
            required
            placeholder="Username"
            name="username"
            defaultValue={modal.post?.username}
          />
          <input
            type="text"
            className="input"
            required
            placeholder="Title"
            name="title"
            defaultValue={modal.post?.title}
          />
          <input
            type="text"
            className="input"
            required
            placeholder="Description"
            name="description"
            defaultValue={modal.post?.description}
          />
          <button type="submit" className="btn">
            {modal.post ? "Update" : "Share"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
