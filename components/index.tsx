import { RequestContext } from "./RequestContext";
import * as React from "react";

export const RequestProvider: React.FC<{ requests: never[] }> = ({
  children,
  requests = [],
}) => {
  return (
    <RequestContext.Provider value={{ requests: requests }}>
      {children}
    </RequestContext.Provider>
  );
};
