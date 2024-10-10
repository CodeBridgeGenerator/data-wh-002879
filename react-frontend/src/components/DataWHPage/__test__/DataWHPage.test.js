import React from "react";
import { render, screen } from "@testing-library/react";

import DataWHPage from "../DataWHPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders dataWH page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DataWHPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("dataWH-datatable")).toBeInTheDocument();
    expect(screen.getByRole("dataWH-add-button")).toBeInTheDocument();
});
