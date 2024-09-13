import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop option from the server", async () => {
  render(<Options optionTypes="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each tooping option from the server", async () => {
  render(<Options optionTypes="toppings" />);

  // find images
  const toopingImages = await screen.findAllByRole("img", { name: /topping$/i });
  expect(toopingImages).toHaveLength(3);

  // check alt text for the images
  const imageTitles = toopingImages.map((topping) => topping.alt);
  expect(imageTitles).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});
