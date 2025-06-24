import React, {useState,useEffect} from "react";
import axios from "axios";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import {Card} from "primereact/card";
import { suspendingUser, findToBeBlocked } from "../../../constants/apiConstants";
import PaginationComponent from "../PaginationComponent/PaginationComponent.jsx";
import {set_currentPage,page_NumberLimit,max_PageNumberLimit,min_PageNumberLimit, items_PerPage} from "../../../constants/PaginationConstant";

export default function SuspendUser()
{
  const [data,setdata]= useState([]);
  const [arr, setArr] = useState([]);
  const [currentPage, setcurrentPage] = useState(set_currentPage);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(max_PageNumberLimit);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(min_PageNumberLimit);

  useEffect(() =>{
    axios
      .get(findToBeBlocked)
      .then((response) => setdata(response.data))
      .catch((err) => console.log(err));
  },[currentPage]);

  const onClickHandler = async (id)=>{
    setArr((val)=>{
      return [...val, id]
    });
    
    return await axios 
      .put(suspendingUser+id)
      .then((response) => console.log("response data",response.data))
      .catch((err) => console.log(err));
    
  }

  const statusButton = (rowData) => {
    if(arr.includes(rowData.userId)){
      return <CustomButton  label="Suspended" className="p-button-primary" disabled={true}/>

    } else {
      return <CustomButton label="Suspend" className="p-button-primary" onClickHandler={()=>onClickHandler(rowData.userId)}/>
    }

  }

  return(
    <>
    
      <div className="card">
        <div className="datatable-templating-demo">
          <Card className='text-center' title= "Users to be Suspended">
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
              <Column header="Suspend user" body={statusButton}></Column>
                            
            </DataTable>
          )}
          <PaginationComponent dataLength={500} itemsPerPage={items_PerPage} maxPageNumberLimit={maxPageNumberLimit} 
            minPageNumberLimit={minPageNumberLimit} setcurrentPage={setcurrentPage} currentPage={currentPage} 
            pageNumberLimit={page_NumberLimit} setmaxPageNumberLimit={setmaxPageNumberLimit} 
            setminPageNumberLimit={setminPageNumberLimit}/>
        </div>
      </div>

    </>
   
    
  );
}
