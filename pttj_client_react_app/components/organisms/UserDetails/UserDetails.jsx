import React ,{useState, useEffect} from "react";
import CustomDataTable from "../../atoms/CustomDataTable/CustomDataTable.jsx";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import PaginationComponent from "../../molecules/PaginationComponent/PaginationComponent.jsx";
import axios from "axios";
import ModalComponent from "../../molecules/ModalComponent/ModalComponent.jsx";
import {set_currentPage,items_PerPage,page_NumberLimit,max_PageNumberLimit,min_PageNumberLimit} from "../../../constants/PaginationConstant";
import { userDetailsUrl } from "../../../constants/apiConstants"


function UserDetails(){
  // setting up data..
  const [data, setData] = useState([]);
  // setting up id of respective row for popup dailog..
  const [id, setId] = useState(-1);

  //props defination..
  /*
   currentPage -> we start from page 1(default)..
   itemsPerPage -> no of data to show per page..
   maxPageNumberLimit -> maximum page Number Limit..
   minPageNumberLimit -> minimum page Number Limit
  */
  const [currentPage, setcurrentPage] = useState(set_currentPage);
  const [itemsPerPage] = useState(items_PerPage);
  const [pageNumberLimit] = useState(page_NumberLimit);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(max_PageNumberLimit);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(min_PageNumberLimit);
  const [isChannel,setIsChannel] = useState(false);
  const [isModerator,setIsModerator] = useState(false);
  
  //const indexOfLastItem = currentPage * itemsPerPage;
  //const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //use data->currentItems..
  //const currentdata = data.slice(indexOfFirstItem, indexOfLastItem);
  
  useEffect(() => {
    loadUsersData();
   
  }, [currentPage]);
  
  const loadUsersData=async () =>{
    let offset=currentPage-1;
    return axios.get(`${userDetailsUrl}`+offset+"/"+items_PerPage)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }; 

  // loadUsers data with respective ID...
  const loadUsersIdData= (value) =>{
    return data.filter((currValue)=>{
      return currValue.userId===value;
    });
  }; 

  // handling the filter, it filters the user details based on roles...
  const handlefilter= async (value) =>{
    let offset= currentPage-1;
    return axios
      .get(`${userDetailsUrl}`+offset+"/"+items_PerPage)
      .then((response) => {
        const newdata = response.data.filter((currValue)=>{
          return currValue.isModerator===value;
        })
        setData(newdata);
      })
      .catch((err) => console.log(err));

  };

  // Reset the data...
  const handleReset= () =>{
    loadUsersData();
  };

  const CustomDataTableConfig = [
    {
      field : "userId",
      header: "User Id"
    },
    {
      field : "username",
      header: "Username"
    },
    {
      field : "gender",
      header: "Gender"
    },
    {
      field : "email",
      header: "Email"
    },
    {
      field : "isModerator",
      header: "Moderator"
    },
  ]

  const onclickchannelbutton = () =>{
    handlefilter("FALSE");
    setIsChannel(true)
    setIsModerator(false)
  };
  const onclickmoderatorbutton = () =>{
    handlefilter("TRUE");
    setIsChannel(false)
    setIsModerator(true)
  };
  const onclickresetbutton = () =>{
    handleReset()
    setIsChannel(false)
    setIsModerator(false)
  };

  const myTernary = (condition, then, otherwise) => condition ? then : otherwise;

  return (
    <>
      {id!==-1 && <ModalComponent data={loadUsersIdData(id)} setId={setId}></ModalComponent>}
      <div className="card">
        <h3 className="text-900 text-center my-2">{(!isChannel&&!isModerator)?"User Details":myTernary(isChannel,"Users which are not Moderator","Users which are Moderator")}</h3>
        {data?.length===0 ? (
          <CustomDataTable  value={data} header1="No data found.."></CustomDataTable>
        ):
          (
            <CustomDataTable value={data} CustomDataTableConfig={CustomDataTableConfig} onRowClick={(e)=>{setId(()=>{
              return e.data.userId;
            })}}></CustomDataTable>
          )}
      </div>
      <div className="button-items mt-4 flex justify-content-between h-2">
        <div>
          <CustomButton className="channel mr-2" label="User" onClickHandler={onclickchannelbutton} disabled={isChannel}/>
          <CustomButton className="moderator mr-2" label="Moderator"onClickHandler={onclickmoderatorbutton} disabled={isModerator}/>
          <CustomButton className="reset" label="Reset filter" onClickHandler={onclickresetbutton}/>
        </div>
        <div>
          <PaginationComponent dataLength={1000} itemsPerPage={itemsPerPage} maxPageNumberLimit={maxPageNumberLimit} 
            minPageNumberLimit={minPageNumberLimit} setcurrentPage={setcurrentPage} currentPage={currentPage} 
            pageNumberLimit={pageNumberLimit} setmaxPageNumberLimit={setmaxPageNumberLimit} 
            setminPageNumberLimit={setminPageNumberLimit}
          ></PaginationComponent>
        </div>
        
      </div>
      
    </>
  );
}

export default UserDetails;