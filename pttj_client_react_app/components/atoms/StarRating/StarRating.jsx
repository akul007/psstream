import React, { useState } from "react";
import { Rating } from "primereact/rating";

/*
* This is a basic star rating component
* designed using prime-react
*/
export const StarRating = () => {
  const [val, setVal] = useState(0);

  return (
    <div>
      <div className="card">
        <h5>Rating: {val}</h5>
        <Rating value={val} onChange={(e) => setVal(e.value)} />
      </div>
    </div>
  )
}
                 