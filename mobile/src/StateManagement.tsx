import React, { useContext, useEffect } from "react";
import { SocketContext } from "./SocketProvider";

const StateManagement = ({children}:{children:React.JSX.Element}) => {
  const {socket} = useContext(SocketContext);
  return children;
}

export default StateManagement;
