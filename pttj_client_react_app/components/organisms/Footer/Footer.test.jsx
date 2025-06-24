import { getByTestId, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Footer from "./Footer";
import React from "react";
import { Provider } from "react-redux"
import store from "../../../redux/store"
describe("<Footer/>",()=>{

    test("footer",()=>{
        render(
            <Provider store={store}>
            <Footer/>
        </Provider>);
        const footele=screen.getByTestId("footer")
        expect(footele).toBeInTheDocument()
    })
    test("copyrighticon",()=>{
        render(
            <Provider store={store}>
            <Footer/>
        </Provider>);
        const copyele=screen.getByTestId("copyrightIcon")
        expect(copyele).toBeInTheDocument()
    })
    test("facebookicon",()=>{
        render(
            <Provider store={store}>
            <Footer/>
        </Provider>);
        const faceele=screen.getByTestId("facebookIcon")
        expect(faceele).toBeInTheDocument()
    })
    test("twitterIcon",()=>{
        render(
            <Provider store={store}>
            <Footer/>
        </Provider>);
        expect(screen.getByTestId("twitterIcon")).toBeInTheDocument()
    })
    test("linkedInIcon",()=>{
        render(
            <Provider store={store}>
            <Footer/>
        </Provider>);
        expect(screen.getByTestId("linkedIn")).toBeInTheDocument()
    })
    test("instagramIcon",()=>
    {

        render(
            <Provider store={store}>
            <Footer/>
        </Provider>);
        expect(screen.getByTestId("instagram")).toBeInTheDocument();
    })
    test("copyrightText",()=>{
        render(
            <Provider store={store}><Footer/></Provider>
            
        )
        expect(screen.getByTestId("copyrightText")).toBeInTheDocument();
    })
    test("twitterText",()=>{
        render(
            <Provider store={store}><Footer/></Provider>    
        )
        expect(screen.getByTestId("twitterText")).toBeInTheDocument();

    })
    test("instagramText",()=>{
        render(
            <Provider store={store}><Footer/></Provider>    
        )
        expect(screen.getByTestId("instagramText")).toBeInTheDocument();

    })
    test("linkedInText",()=>{
        render(
            <Provider store={store}><Footer/></Provider>    
        )
        expect(screen.getByTestId("linkedInText")).toBeInTheDocument();

    })
    test("facebookText",()=>{
        render(
            <Provider store={store}><Footer/></Provider>    
        )
        expect(screen.getByTestId("facebookText")).toBeInTheDocument();

    })
});