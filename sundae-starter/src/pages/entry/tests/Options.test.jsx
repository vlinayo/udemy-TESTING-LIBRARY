import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop option from the server", async () => {
  render(<Options optionTypes="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
  expect(scoopImages).toHaveLength(2);

  // confirm all text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
