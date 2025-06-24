import "./UnlockUser.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { unlockUsers, findLockedUsers } from "../../../constants/apiConstants";
import { Card } from "primereact/card";
import PaginationComponent from "../PaginationComponent/PaginationComponent.jsx";
import {set_currentPage,page_NumberLimit,max_PageNumberLimit,min_PageNumberLimit, items_PerPage} from "../../../constants/PaginationConstant";

export default function UnlockUser()
{
  const [data,setData]= useState([]);
  const [arr, setArr] = useState([]);
  const [currentPage, setcurrentPage] = useState(set_currentPage);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(max_PageNumberLimit);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(min_PageNumberLimit);

  useEffect(() =>{
    let offset=currentPage-1;
    axios
      .get(findLockedUsers+"/"+offset+"/"+items_PerPage)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  },[currentPage]);
  
  const unlock = async (id)=>{
    
    setArr((val)=>{
      return [...val, id]
    });
    
    return await axios 
      .put(unlockUsers+id)
      .then((response) => console.log("response data",response.data))
      .catch((err) => console.log(err));
    
  }
  
  const statusButton = (rowData) => {
    if(arr.includes(rowData.userId)){
      return <CustomButton  label="Unlocked" className="p-button-primary" disabled={true}/>
    } else {
      return <CustomButton label="Unlock" className="p-button-primary" onClickHandler={()=>unlock(rowData.userId)}/>
    }

  }

  return(
    <div className="card w-11 mx-auto">
      <div className="datatable-templating-demo">
        <Card title="Users to be Unlocked" className="card text-center">
        </Card>
        {data.length === 0 ? (
          <DataTable value={data} responsiveLayout="scroll">
            <Column header="No data found.."></Column>
          </DataTable>
        ) : (
          <DataTable className="table" responsiveLayout="scroll" stripedRows value={data}>
            <Column field="userId" header="User Id"></Column>
            <Column field="name.firstName" header="First Name"></Column>
            <Column field="name.lastName" header="Last Name"></Column>
            <Column field="karmaPoints" header="Karma points"></Column>
            <Column header="Unlock user" body={statusButton}></Column>
                            
          </DataTable>
        )}
        <PaginationComponent dataLength={500} itemsPerPage={items_PerPage} maxPageNumberLimit={maxPageNumberLimit} 
          minPageNumberLimit={minPageNumberLimit} setcurrentPage={setcurrentPage} currentPage={currentPage} 
          pageNumberLimit={page_NumberLimit} setmaxPageNumberLimit={setmaxPageNumberLimit} 
          setminPageNumberLimit={setminPageNumberLimit}/>
      </div>
    </div>
  );
}