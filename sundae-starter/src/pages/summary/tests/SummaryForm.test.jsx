import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

/**
 * Write tests to ensure that
Checkbox is unchecked by default
Checking checkbox enables button
Unchecking checkbox again disables button
A chance to set up your own test file from scratch
Use tests from last section as a model
Render the <SummaryForm /> component
Find checkbox and button using ( name ) option
Use mockup for "name" option values
Check that tests fail! Red part of red-green testing.
 */

test('checkbox and button confirmation flow', async () => {

    // create user instance
    const user = userEvent.setup();

    render(<SummaryForm/>);

    //checkbox with agree with terms
    const checkboxElement = screen.getByRole("checkbox", { name: /terms/i});

    // button with confirm
    const buttonElement = screen.getByRole("button", { name: /confirm/i});

    //Initial state
    expect(buttonElement).toBeDisabled();
    expect(checkboxElement).not.toBeChecked();

    //trigger checkbox
    await user.click(checkboxElement);
    expect(buttonElement).toBeEnabled();
    expect(checkboxElement).toBeChecked();

    await user.click(checkboxElement);
    expect(buttonElement).toBeDisabled();
    expect(checkboxElement).not.toBeChecked();

 });

 test('popover responds to hover', async () => { 
    const user = userEvent.setup();
    render(<SummaryForm/>);

    //when checking for null use queryBy
    const nullPopover = screen.queryByText(/no ice cream/i);
    expect(nullPopover).not.toBeInTheDocument();

    //on mouse hover, popover appears
    const termsAndConditions = screen.getByText(/terms/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream/i);
    expect(popover).toBeInTheDocument();

    await user.unhover(termsAndConditions);
    expect(popover).not.toBeInTheDocument();

 })
