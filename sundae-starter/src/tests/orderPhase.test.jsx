import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test('order phases for happy path', async () => {
    const user = userEvent.setup();
    //render app
    render(<App />);

    //add ice cream scoops and toppings
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    const cherriesOption = await screen.findByRole('checkbox', { name: /Cherries/i });
    await user.click(cherriesOption);

    //find and click the order button
    const orderButton = screen.getByRole("button", { name: /Order /i });
    await user.click(orderButton);

    //check that the summary information is correct based on our order
    const scoopsSummaryTotal = await screen.findByRole("heading", { name: /Scoops: \$/i });
    const toppingsSummaryTotal = await screen.findByRole("heading", { name: /Toppings: \$/i });
    const summaryTotal = await screen.findByRole("heading", { name: /Total: \$/i });
    expect(scoopsSummaryTotal).toHaveTextContent("2.00");
    expect(toppingsSummaryTotal).toHaveTextContent("1.50");
    expect(summaryTotal).toHaveTextContent("3.50");

    //accept the terms and conditions and click button to confirm order
    const termsCheckbox = screen.getByRole("checkbox", { name: /terms/i });
    await user.click(termsCheckbox);
    const buttonElement = screen.getByRole("button", { name: /confirm/i });
    await user.click(buttonElement); //redirects to confirmation page

    //confirm order number on confirmation page
    const loadingOrderNumber = await screen.findByText("Loading...");
    expect(loadingOrderNumber).toBeInTheDocument();

    const thankYouHeader = await screen.findByRole("heading", {
        name: /thank you/i,
    });
    expect(thankYouHeader).toBeInTheDocument();

    // expect that loading has disappeared
    const notLoading = screen.queryByText("loading");
    expect(notLoading).not.toBeInTheDocument();

    const orderNumberObtained = await screen.findByText(/order number/i);
    expect(orderNumberObtained).toBeInTheDocument();

    //click "new order" button on confirmation page
    const newOrderButton = screen.getByRole("button", { name: /new order/i });
    await user.click(newOrderButton); //redirects to new order page

    //check scoops and toppings have been reset
    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
    const grandTotalElem = screen.getByRole('heading', { name: /Grand total: \$/i });
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    expect(toppingsSubtotal).toHaveTextContent("0.00");
    expect(grandTotalElem).toHaveTextContent("0.00");

})


//screen.debug() -> get better idea on why you can or can´t find something
// For debugging also:
// import { logRoles } from "@testing-library/react";
// const {container } = render(<App/>);
// logRoles(container);