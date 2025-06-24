import React from "react";
import { render, screen } from "@testing-library/react";
import PaginationComponent from "./PaginationComponent";

describe('pagination', () => {
    test('renders number of buttons',async() =>  {
        render(<PaginationComponent />)
        const linkElements= await screen.findAllByRole('button')
        expect(linkElements).toHaveLength(2);    
    })
    test('renders page',() =>  {
        render(<PaginationComponent />)
        const linkElements=screen.getByTestId('pagetest')
        expect(linkElements).toBeInTheDocument();    
    })

    

});

