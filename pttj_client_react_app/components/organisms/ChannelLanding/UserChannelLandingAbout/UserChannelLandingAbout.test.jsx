import { render, screen} from "@testing-library/react";
import UserChannelLandingAbout from "./UserChannelLandingAbout";
import {Provider} from 'react-redux';
import store from '../../../../redux/store';


test('render text Description on screen', () => {
        render(
        <Provider store={store}>
            <UserChannelLandingAbout></UserChannelLandingAbout>
       </Provider>
       );
        expect(screen.getByText("Description")).toBeInTheDocument();
    });

    test('render text Stats on screen', () => {
        render(
        <Provider store={store}>
            <UserChannelLandingAbout></UserChannelLandingAbout>
       </Provider>
       );
        expect(screen.getByText("Stats")).toBeInTheDocument();
    });