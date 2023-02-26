import axios, { AxiosResponse } from "axios";
import { useEffect, useReducer, useState } from "react";

interface CreateLinkResponse {
  link_token: string;
}

enum CreateLinkActionKind {
  CREATED_SUCCESFULY = "CREATED_SUCCESFULY",
  FAILED = "FAILED",
  REQUESTED = "REQUESTED",
}

type Action =
  | { type: CreateLinkActionKind.REQUESTED }
  | { type: CreateLinkActionKind.FAILED }
  | { type: CreateLinkActionKind.CREATED_SUCCESFULY; payload: string };

function reducer(
  state: {
    linkToken: string | null;
    isFetching: boolean;
    isError: boolean;
  },
  action: Action
) {
  switch (action.type) {
    case CreateLinkActionKind.REQUESTED:
      return { ...state, isFetching: true };
    case CreateLinkActionKind.FAILED:
      return { ...state, isError: true, isFetching: false };
    case CreateLinkActionKind.CREATED_SUCCESFULY:
      return {
        ...state,
        linkToken: action.payload,
        isError: false,
        isFetching: false,
      };
    default:
      throw new Error();
  }
}

const useCreateLinkToken = () => {
  const [state, dispatch] = useReducer(reducer, {
    isFetching: false,
    isError: false,
    linkToken: null,
  });

  const generateToken = () => {
    dispatch({ type: CreateLinkActionKind.REQUESTED });
    axios
      .post("/api/create_link_token")
      .then((res: AxiosResponse<CreateLinkResponse>) => {
        dispatch({
          type: CreateLinkActionKind.CREATED_SUCCESFULY,
          payload: res.data.link_token,
        });
      })
      .catch(() => {
        dispatch({ type: CreateLinkActionKind.FAILED });
      });
  };

  useEffect(() => {
    generateToken();
  }, []);

  return { ...state, retryGenerateToken: generateToken };
};

export default useCreateLinkToken;
