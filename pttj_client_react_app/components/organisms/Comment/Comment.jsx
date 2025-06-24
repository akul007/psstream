import React,{useEffect,useRef} from "react";
import { DataScroller } from "primereact/datascroller";
import { Fieldset } from "primereact/fieldset";
import { Avatar } from "primereact/avatar";
import "./Comment.css";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { reportCommentApi } from "../../../constants/apiConstants";
import { addCommentApi } from "../../../constants/apiConstants";
import { fetchComments } from "../../../redux/actions/fetchComments";
import { Toast } from "primereact/toast";
import axios from "axios";
import { useState } from "react";
import timeDiffCalc from "../../../utils/timeDiffCalc";


/*
* Comments component expects a parameter videoId
* of the video for which we want to show comments
* After clicking on add comment, user is able to add the comment
* for the corresponding video
*/

function Comment({videoId}) {
  const comments = useSelector(state => state.videoComments.comments);
  const userId = useSelector(state=> state.user.userInfo.id);
  const [newComment,setNewComment] = useState("");
  const dispatch = useDispatch();
  const toast = useRef(null);
  useEffect(() => {
    dispatch(fetchComments(videoId))
  }, [])
  
  const handleReportClick = (commentId) =>{
    axios.put(reportCommentApi+commentId).then(()=>{
      toast.current.show({severity:"success", summary: "Comment Reported", detail:"", life: 3000});
    })
      .catch((e)=>{
        toast.current.show({severity:"error", summary: "Something went wrong", detail:e.response.message, life: 3000});
      })
  }

  const itemTemplate = (comment) => {
    return (
      <div className="comment-body">
        
        <div className="comment-main">
          <div className="comment-author">
            <Avatar icon="pi pi-user" className="mr-2" shape="circle" style={{backgroundColor:"red"}}/>
          </div>
          <div className="comment-details">
            <div className="comment-main-header">
              {comment.user.username}<span className="comment-main-header-time">{timeDiffCalc(comment.commentDate)} ago</span>
            </div>
            <div className="comment-main-content">
              {comment.commentText}
            </div>
          </div>
        </div>
        <div className="comment-end">
          <Button icon="pi pi-exclamation-triangle" className="p-button-rounded p-button-text p-button-plain comment-report" title="Report Comment" onClick={()=>handleReportClick(comment.commentId)}/>
        </div>
      </div>
    );
  }
  const handleChange = (e)=>{
    setNewComment(e.currentTarget.textContent);
  }
  const handleCommentSubmit =()=>{
    let body = {
      videoId,
      userId,
      "commentText":newComment
    }
    axios.post(addCommentApi,body).then(()=>{
      dispatch(fetchComments(videoId));
    }).then(()=>{
      toast.current.show({severity:"success", summary: "Comment Added", detail:"", life: 2000});
    })
      .catch((e)=>{
        console.log(e.response.data);
        toast.current.show({severity:"error", summary: "Your comment can't be added!", detail:"", life: 3000});
      })
    document.getElementById("text").innerHTML = "";
  }
  return (

    <div className="datascroller-demo" data-testid="commentPage">
      <Toast ref={toast} />
      
      <Fieldset legend="Comments" toggleable data-testid="commenttoggle">
        <div className="add-comment">
          <Avatar icon="pi pi-user" className="mr-2" shape="circle" style={{backgroundColor:"red"}}/>
          <div className="comment-area">
            <div className="comment-text" id="text" contentEditable placeholder="Add a comment..." onInput={(e)=>handleChange(e)} suppressContentEditableWarning={true}></div>
          </div>
          <Button icon="pi pi-send" className="p-button-rounder p-button p-button-text p-button-plain" title="Add Comment" onClick={handleCommentSubmit} data-testid="addComment"/>
        </div>
        <DataScroller value={comments} itemTemplate={itemTemplate} rows={5} inline scrollHeight="250px" />
      </Fieldset>
    </div>
  )
}

export default Comment;