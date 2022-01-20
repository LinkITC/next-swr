import { Method } from "axios";
import { SWRConfiguration, BareFetcher } from "swr";

export interface RequestOptions<Data, RequestParams> {
  swrOptions: SWRConfiguration<Data, Error, BareFetcher<Data>>;
  path: string;
  params?: RequestParams;
  method: Method;
  fetcher: (a: any) => any;
}

export type WaveProps = Omit<RequestOptions<any, any>, "swrOptions">;
