/**
 * @jest-environment jsdom
 */
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "..";

afterEach(cleanup);

describe("Checkbox", () => {
    it("It renders correctly", () => {
        const { container } = render(<Checkbox />);
        expect(container.querySelector("label")).toBeTruthy();
        expect(container.querySelector(".app-checkbox-label")).toBeTruthy();
        expect(container.querySelector(".app-checkbox")).toBeInTheDocument();
    });
});
