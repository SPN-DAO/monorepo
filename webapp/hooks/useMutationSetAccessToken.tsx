import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";

interface CreateLinkResponse {
  link_token: string;
}

const setAccessToken = async (public_token: string) => {
  const response = await axios.post("/api/set_access_token", { public_token });
  return response.data;
};

const useMutationSetAccessToken = (
  options: Parameters<typeof useMutation>[2]
) =>
  useMutation<CreateLinkResponse, AxiosError, string>(setAccessToken, options);

export default useMutationSetAccessToken;
