import React from "react";
import { Skeleton } from "primereact/skeleton";


export default function ProfileSkeleton({className=""}){
  return(
    <div className={"card"+className}>
      <Skeleton width="100%" height="4rem" className="m-4"/>
      <Skeleton width="100%" height="4rem" className="m-4"/>
      <Skeleton width="100%" height="4rem" className="m-4"/>
      <Skeleton width="100%" height="4rem" className="m-4"/>
      <Skeleton width="100%" height="4rem" className="m-4"/>
    </div>
  )
}
 