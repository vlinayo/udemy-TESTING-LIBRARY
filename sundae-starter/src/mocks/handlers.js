import { http, delay, HttpResponse } from "msw";

export const handlers = [
  http.get('http://localhost:3030/scoops', () => {
    return HttpResponse.json([
      { name: "Chocolate", imagePath: "/images/chocolate.png" },
      { name: "Vanilla", imagePath: "/images/vanilla.png" },
    ]);
  }),
  http.get('http://localhost:3030/toppings', () => {
    return HttpResponse.json([
      { name: "Cherries", imagePath: "/images/cherries.png" },
      { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
      { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
    ]);
  }),
  http.post("http://localhost:3030/order", async () => {
    await delay(400);
    const orderNumber = Math.floor(Math.random() * 10000000000);
    return HttpResponse.json({ orderNumber: orderNumber }, { status: 201 });
  })
];
