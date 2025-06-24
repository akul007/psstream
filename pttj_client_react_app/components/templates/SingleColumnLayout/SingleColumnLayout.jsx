import React from "react";
import Header from "../../organisms/Header/Header.jsx";
import Footer from "../../organisms/Footer/Footer.jsx";

const SingleColumnLayout = ({children}) => {
  return (
    <div data-testid="singleCol">
      <Header/>
      {children}
      <Footer/>
    </div>  
  )
}
export default SingleColumnLayout;
