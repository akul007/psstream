import { Card } from "primereact/card";
import React from "react";
import Post  from "../../molecules/ModeratorPost/Post.jsx";

const ModeratorHome = () => {
  return (
    <Card title="Audit videos" className="text-center" data-testid="moderatortest"><Post/></Card>
  )
}
export default ModeratorHome;
