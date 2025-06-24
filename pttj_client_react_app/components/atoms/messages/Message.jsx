import React, { useEffect,useRef } from "react";
import { Messages } from "primereact/messages";


{
  /*
  created by : Sanjay Kumar G
  description : this is when you want to show a messsage after a event 
                props contain severity, summary , detail, sticky values
                severity should be 'successs' , 'info' , 'warn', 'error'
  */

}
function Message(props){
  const msgs1 = useRef(null);

  useEffect(() => {
    msgs1.current.show([
      { severity: props.severity, summary: props.summary, detail: props.detail, sticky: props.sticky },
    ]);

  },[]);

  return (
    <Messages ref={msgs1}/>
  )
}

export default Message;