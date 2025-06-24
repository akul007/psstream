import React, { useState } from "react";
import "./FilterComponent.css";
import { ListBox } from "primereact/listbox";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoGrandeursList } from "../../../redux/actions/fetchVideoGrandeursList_action";

export default function FilterComponent({selectedType,selectedGrandeurs,selectedSort,setSelectedType,setSelectedGrandeurs,setSelectedSort,setVideoDataGrand}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [grandeursSelected, setGrandeursSelected] = useState(false);
  const dispatch = useDispatch();

  //data entered in search bar 
  const enterData = useSelector(state =>{
    return state.searchData.searchData;
  })

  // api call to fetch respective grandeurs video data
  if(grandeursSelected){
    dispatch(fetchVideoGrandeursList(enterData,selectedGrandeurs.code));
    setGrandeursSelected(false);
  }

  // getting the videos data of respective grandeurs
  const videoDataGrand = useSelector(state => {
    return state.videoGrandeursList.all;
  })
  setVideoDataGrand(videoDataGrand);

  const onClick = (itemIndex) => {
    let _activeIndex = activeIndex ? [...activeIndex] : [];

    if (_activeIndex.length === 0) {
      _activeIndex.push(itemIndex);
    }
    else {
      const index = _activeIndex.indexOf(itemIndex);
      if (index === -1) {
        _activeIndex.push(itemIndex);
      }
      else {
        _activeIndex.splice(index, 1);
      }
    }

    setActiveIndex(_activeIndex);
  }
    
  const types = [
    { name: "Video", code: "video" ,},
    { name: "Channel", code: "channel"},
  ];
  const grandeurs = [
    {name: "Anime",code: "anime"},
    {name: "Art",code: "art"},
    {name: "Architecture",code: "architecture"},
    {name: "Data Science",code: "dataScience"},
    {name: "Fashion",code: "fashion"}
  ]
  const SortBy = [
    {name: "Popularity",code: "popularity"},
    {name: "Ratings",code: "ratings"}
  ]

  let isDisabled;
  if(selectedType === null){
    isDisabled = true;
  }else{
    (selectedType.code==="video")?(isDisabled = false):(isDisabled = true);
  }

  return (
    <div className="card mb-2">
      <div className="pt-0 pb-2">
        <CustomButton icon={activeIndex && activeIndex.some((index) => index === 0) ? "pi pi-filter-fill" : "pi pi-filter"} label="Filters" onClickHandler={() => 
          onClick(0)} className="p-button-text filter-item" />
        <div data-testid="test" className="filter-item">
          {activeIndex && activeIndex.some((index) => index === 0)?(
            <div className="filter-items">
              <div className="type-items">
                <h6>Type</h6>
                <ListBox value={selectedType} options={types} onChange={(e) => setSelectedType(e.value)} optionLabel="name" style={{ width: "6.6em" }}/>    
              </div>
              <div className='grandeur-items'>
                <h6>Grandeurs</h6>
                <ListBox value={selectedGrandeurs} options={grandeurs} onChange={(e) => {
                  setSelectedGrandeurs(e.value);
                  setGrandeursSelected(true);
                }
                } optionLabel="name" style={{ width: "8.5em" }} disabled={isDisabled} />    
              </div>
              <div className='Sort-items'>
                <h6>Sort By</h6>
                <ListBox value={selectedSort} options={SortBy} onChange={(e) => setSelectedSort(e.value)} optionLabel="name" style={{ width: "7.5em" }} optionValue="code" optionDisabled={(isDisabled)?((option) => option.name === "Ratings"):null}/>    
              </div>
            </div> 
          ):null}  
        </div>
      </div>
    </div>
  )
}