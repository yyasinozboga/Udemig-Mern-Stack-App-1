import { AxiosError } from "axios";
import { ILoginBody, IPost, IRegisterBody } from "../models/data";
import api from "./instance";

type PostBody = IRegisterBody | ILoginBody | IPost;

export const postRequest = async (url: string, body: PostBody) => {
  try {
    const { data } = await api.post(url, body);

    return data;
  } catch (error) {
    return new Error("Error: " + (error as AxiosError).response?.data);
  }
};

export const getRequest = async (url: string) => {
  const { data } = await api.get(url);

  return data;
};

export const patchRequest = async (url: string, body: IPost) => {
  const { data } = await api.patch(`${url}/${body._id}`, body);

  return data;
};

export const deleteRequest = async (url: string, postId?: string) => {
  const fullUrl = postId ? `${url}/${postId}` : url;
  await api.delete(fullUrl);
};
