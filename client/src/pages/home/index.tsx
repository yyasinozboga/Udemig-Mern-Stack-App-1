import React, { useEffect, useState } from "react";
import Header from "./Header";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import Post from "../../components/Post";
import { getAllPosts } from "../../store/actions/postActions";
import { IPost } from "../../models/data";

export type ModalType = {
  isOpen: boolean;
  post?: IPost;
};

const Home = () => {
  const { isLoading, error, posts } = useSelector(
    (state: RootState) => state.postReducer,
  );
  const [modal, setModal] = useState<ModalType>({
    isOpen: false,
    post: undefined,
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div>
      <Header setModal={setModal} />
      <main className="m-8 grid grid-cols-4 gap-10">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Post key={post._id} setModal={setModal} post={post} />
          ))
        )}
      </main>
      {modal.isOpen && <Modal modal={modal} setModal={setModal} />}
    </div>
  );
};

export default Home;
