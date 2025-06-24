import React from "react";
import CustomButton from "../../atoms/buttons/CustomButton.jsx";
import "./PaginationComponent.css";

function PaginationComponent({dataLength,itemsPerPage=5,maxPageNumberLimit=5,minPageNumberLimit=0,
  setcurrentPage,currentPage=1,pageNumberLimit=5,setmaxPageNumberLimit,setminPageNumberLimit}) {

  //storing the page number
  const pages = [];
  for (let i = 1; i <= Math.ceil(dataLength / itemsPerPage); i++) {
    pages.push(i);
  }

  // rendering pageNumber
  const renderPageNumbers = pages.map((number) => {
    if (number < (maxPageNumberLimit + 1) && number > minPageNumberLimit) {
      return (
        <li key={number} className='page-item'>
          <CustomButton label={number} onClickHandler={() =>setcurrentPage(number)}  className={(currentPage === number) ? "bg-indigo-900 text-900" : "p-button-primary"}/>
        </li>
      );
    } 
    return null;
  });

  // handling the next funtionality of pagination
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // handling the previous funtionality of pagination
  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };


  const pageDecrementBtn = (minPageNumberLimit >= 1) ? <li onClick={handlePrevbtn} aria-hidden="true" > &hellip; </li> : null
  const pageIncrementBtn = (pages.length > maxPageNumberLimit) ? <li onClick={handleNextbtn} aria-hidden="true" > &hellip; </li> : null

  return (
    <>
      <ul className="pageNumbers" data-testid="pagetest">
        <li>
          <CustomButton className="prevbutton" label="Prev" onClickHandler={handlePrevbtn} disabled={currentPage === 0 ? true : false}/>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <CustomButton className="nextbutton" label="Next" onClickHandler={handleNextbtn} disabled={currentPage === dataLength ? true : false}/>
        </li>
      </ul> 
    </>
  );
}


export default PaginationComponent;

