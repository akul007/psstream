import React,{useState} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./Searchbar.css";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import {useNavigate} from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { fetchSearchList } from "../../../redux/actions/fetchSearchList_action";
import { fetchChannelList } from "../../../redux/actions/fetchChannelList_action";
import { setSearchData } from "../../../redux/actions/serchdataAction";


/*for making Search bar I have used Input and search icon for making it and it is set into header*/ 
const Searchbar = () => {
  const[enterData,setEnterData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handling search input
  function handle(e){
    setTimeout(() => {
      setEnterData(e.target.value);
      dispatch(setSearchData(e.target.value));
    }, 1000);
  }


  //video api call
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(fetchSearchList(enterData));
    dispatch(fetchChannelList(enterData));
    navigate("/searchList");
  }

  return (
    <>
      <div>
        <form className="searchform justify-content-between" onSubmit={handleSubmit} data-testid="form">
          <input id="" type="text" placeholder='Search' onChange={(e)=>handle(e)} />
          <CustomButton className="p-button p-button-text" type='submit'>
            <AiOutlineSearch size={22}/>
          </CustomButton>
        </form>
      </div>
    </>
  )
}
export default Searchbar;