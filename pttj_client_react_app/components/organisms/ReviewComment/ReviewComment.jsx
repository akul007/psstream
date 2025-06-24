import React,{useEffect,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportedCommentAction } from "../../../redux/actions/fetchReportedComment_action.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import { Toast } from "primereact/toast";
import { deleteReportedCommentApi } from "../../../constants/apiConstants.js";
import axios from "axios";
import { Button } from "primereact/button";
import timeDiffCalc from "../../../utils/timeDiffCalc.js";

/*

This Comments is used for reviewing all reported comments by moderator.
Moderator can see who did that comment and how many reports comment received.
Moderator can delete comment,if it is not following  guildlines.

*/

function ReviewComment() {
  const comments = useSelector(state => state.reportedComment.comments);
  const dispatch = useDispatch();
  const toast = useRef(null);
  useEffect(() => {
    dispatch(reportedCommentAction());
  }, [])
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
  const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
  //   Deletes the reported Comment
  const handleClick = (id) =>{
    axios.delete(deleteReportedCommentApi+id).then(()=>{
      toast.current.show({severity:"success", summary: "Comment Deleted", detail:"", life: 3000});
      dispatch(reportedCommentAction());
    }).catch(()=>{
      toast.current.show({severity:"error", summary: "Comment Can't be Deleted", detail:"", life: 3000});
    })
  }
  //   Changing comment Date to proper format
  const commentedDate = (rowData) => {
    return <div>{timeDiffCalc(rowData.commentDate)} ago</div>
  }
  //   This element return delete Button
  const deleteComment = (rowData)=>{
    return <CustomButton label="Delete" className="p-button-primary" onClickHandler={()=>handleClick(rowData.commentId)}/>
  }
  return (
    <div className="card" data-testid="comment">
      <Toast ref={toast} />
      <h3 className="text-900 text-center my-2">Review Comments</h3>
      {comments?.length===0 ? (
        <p>No data found...</p>
      ):
        (
          <DataTable value={comments} paginator responsiveLayout="scroll"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
            <Column header="Commented" body={commentedDate}></Column>
            <Column field="user.username" header="Username" ></Column>
            <Column field="commentText" header="Comment" ></Column>
            <Column field="noOfReports" header="Reports" ></Column>
            <Column header="Delete" body={deleteComment}></Column>
          </DataTable>
        )}
    </div>
  )
}

export default ReviewComment