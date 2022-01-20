import { useContext, useMemo } from "react";
import useSWR from "swr";
import axios from "axios";

import { RequestContext } from "../components/RequestContext";
import { RequestOptions } from "./index.interfaces";

export const useRequest = <Data, RequestParams>({
  method,
  path,
  params,
  fetcher,
  swrOptions,
}: RequestOptions<Data, RequestParams>) => {
  const { data, error } = useSWR(
    { url: path, args: params, method },
    fetcher({ params, method, path }),
    swrOptions
  );

  const isLoading = useMemo(() => !error && !data, [error, data]);

  return { data, isLoading, isError: error };
};
