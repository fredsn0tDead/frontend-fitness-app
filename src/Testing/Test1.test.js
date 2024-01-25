import React from "react";
import {render,screen} from "@testing-library/react";
import { ExcersiseLog } from "../Components/ExcersiseLog";

test('renders component without crashing', () => {
    render(<ExcersiseLog />);
    expect(screen.getByText('Excersise Log')).toBeInTheDocument();
});