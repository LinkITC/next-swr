import { AxiosResponse } from "axios";
import { WaveProps } from "./index.interfaces";
import isEqual from "lodash.isequal";

export type Wave = (data: any) => WaveProps[];

export const fetchRequestsByOptions = async (waves: Wave[]) => {
  try {
    const requestsList: AxiosResponse[] = [];
    const responseData: (AxiosResponse | undefined)[] = [];
    const requestsOptions: WaveProps[] = [];

    const wave = async (level: Wave, levels: Wave[]) => {
      const requests = level(responseData).map((item) => {
        return item.fetcher(1);
      });

      const responses = await Promise.allSettled(requests);

      responses.forEach((item) => {
        if (item.status === "rejected") {
          responseData.push(undefined);
        } else {
          requestsList.push(item.value);
          responseData.push(item.value.data);
        }
      });

      if (levels.length > 0) {
        await wave(levels.shift()!, levels);
      }
    };

    if (waves && waves.length > 0) {
      const optionsCopy = [...waves];
      await wave(optionsCopy.shift()!, optionsCopy);
    }

    const cachedRequest = requestsList.map((item) => {
      const { data, headers, status, statusText } = item;

      const { path, params, method } =
        requestsOptions.find(
          (el) =>
            el.path === (item.config as any).path &&
            isEqual(el.params, item.config.params)
        ) || {};

      const key = generateKey({
        path,
        params,
        method,
      });

      return {
        key,
        data: { data, headers, status, statusText },
      };
    });

    return { data: cachedRequest };
  } catch (error) {
    return { data: [] };
  }
};

const generateKey = ({ path, params, method }: any) => {
  return path + method;
};
