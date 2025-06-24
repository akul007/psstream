import React from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Logged ({children}){
  const user = useSelector(state => state.user?.userInfo);
  if (user.roles && user?.roles[0]==="ROLE_USER") {
    return <Navigate to="/home"/>
  }
  else if (user.roles && user?.roles[0]==="ROLE_MODERATOR") {
    return <Navigate to="/moderator"/>
  }
  else if (user.roles && user?.roles[0]==="ROLE_ADMIN") {
    return <Navigate to="/admin"/>
  }

  return children;

}