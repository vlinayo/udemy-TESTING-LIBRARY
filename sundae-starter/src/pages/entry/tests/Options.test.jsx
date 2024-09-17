import {render, screen} from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from the server", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toopingImages = await screen.findAllByRole("img", { name: /topping$/i });
  expect(toopingImages).toHaveLength(3);

  // check alt text for the images
  // @ts-ignore
  const imageTitles = toopingImages.map((topping) => topping.alt);
  expect(imageTitles).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});
