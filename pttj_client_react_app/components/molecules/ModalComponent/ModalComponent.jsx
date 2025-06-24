import React  from "react";
import { Dialog } from "primereact/dialog";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import "./ModalComponent.css";

export default function ModalComponent({data,setId}){
  const renderFooter = () => {
    return (
      <div>
        <CustomButton label="Close" onClickHandler={() => setId(-1)} />
      </div>
    );
  }
  return(
    <>
      <Dialog data-testid="dialogtest" header='Details' visible={true} style={{ width: "40vw" }} footer={renderFooter()}  onHide={() => setId(-1)}>
        <ul>
          <ol>User Id : {data?.[0].userId}</ol>
          <ol>Username : {data?.[0].username}</ol>
          <ol>Name : {data?.[0].name?.firstName} {data?.[0].name?.middleName} {data?.[0].name?.lastName} </ol>
          <ol>Phone Number : {data?.[0].phoneNo}</ol>
          <ol>Karma points : {data?.[0].karmaPoints}</ol>
          <ol>Email : {data?.[0].email}</ol>
          <ol>Address : {data?.[0].address?.city} {data?.[0].address?.country}</ol>
          <ol>Roles : {data?.[0].roles[0]?.name}</ol>
        </ul>
      </Dialog>
    </>
  );
}