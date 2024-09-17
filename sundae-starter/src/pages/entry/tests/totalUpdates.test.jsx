import {render, screen} from "../../../test-utils/testing-library-utils";
import userEvent from '@testing-library/user-event';
import Options from "../Options";

//confirm scoops subtotal updates correctly
test("update scoop subtotal when scoops change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops"/>);

    //initial value of totals $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', {exact: false});
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    //update one option vanilla scoops to 1 and check subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent("2.00");

    //update chocolate scoops to 1 and subtotal must be updated
    const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings"/>);

    //initial value of totals $0.00
    const toppingsSubtotal = screen.getByText('Toppings total: $', {exact: false});
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    //update one option cherries topping to true and check subtotal
    const cherriesOption = await screen.findByRole('checkbox', {name: /Cherries/i});
    
    expect(cherriesOption).not.toBeChecked();
    await user.click(cherriesOption);
    expect(cherriesOption).toBeChecked();
    expect(toppingsSubtotal).toHaveTextContent("1.50");

    //update chocolate scoops to 1 and subtotal must be updated
    const mmsOption = await screen.findByRole('checkbox', {name: 'M&Ms'});
    expect(mmsOption).not.toBeChecked();
    await user.click(mmsOption);
    expect(mmsOption).toBeChecked();
    expect(toppingsSubtotal).toHaveTextContent("3.00");

    //remove a topping and update totals
    await user.click(mmsOption);
    expect(mmsOption).not.toBeChecked();
    expect(toppingsSubtotal).toHaveTextContent("1.50");

});