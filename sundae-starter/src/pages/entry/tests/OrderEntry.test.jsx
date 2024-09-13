import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

import { render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";

test('handle error for scoops and toppings routes', () => { 
    // server.resetHandlers(
    //     http.get("http://localhost:3030/scoops")
    // )
 })