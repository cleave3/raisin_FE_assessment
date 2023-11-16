/**
 * @jest-environment jsdom
 */
import { cleanup, render, getAllByText, fireEvent, getByLabelText, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";
import Multicheck from "..";

const TEST_OPTIONS = [
    { label: "aaa", value: "111" },
    { label: "bbb", value: "222" },
    { label: "ccc", value: "333" },
    { label: "ddd", value: "444" },
    { label: "eee", value: "555" },
    { label: "fff", value: "666" },
    { label: "ggg", value: "777" },
    { label: "hhh", value: "888" },
    { label: "iii", value: "999" },
];

afterEach(cleanup);

describe("MultiCheck", () => {
    const label = "Test-label";
    const onChange = jest.fn();
    describe("initialize", () => {
        it("renders the label if label provided", () => {
            const { container } = render(<Multicheck options={[]} label={label} />);
            expect(getAllByText(container, label)).toBeTruthy();
        });

        it("should render the correct number of checkboxes", () => {
            const { container } = render(<Multicheck options={TEST_OPTIONS} label={label} />);
            expect(container.querySelectorAll(".app-checkbox").length).toEqual(TEST_OPTIONS.length + 1);
        });

        it("should not render the select all checkbox when options is less than one", () => {
            const { container } = render(<Multicheck options={[]} label={label} onChange={onChange} />);

            expect(container.querySelectorAll(".app-checkbox").length).toBeLessThan(1);
        });
    });

    describe("Fire Events", () => {
        it("should fire change event when clicked", () => {
            const { container } = render(<Multicheck options={TEST_OPTIONS} label={label} onChange={onChange} />);
            const checkboxes = container.querySelectorAll(".app-checkbox");
            fireEvent.click(checkboxes?.[0]!);
            fireEvent.click(checkboxes?.[1]!);
            expect(onChange).toBeCalledTimes(2);
        });

        it("should check defaultValues when passed", () => {
            const defaultValues = ["999", "888"];
            render(<Multicheck options={TEST_OPTIONS} label={label} values={defaultValues} onChange={onChange} />);
            const checkboxes = document.querySelectorAll(".app-checkbox");
            const checked = [].filter.call(checkboxes, (el: HTMLInputElement) => {
                return el.checked;
            });
            expect(checked.length).toEqual(defaultValues.length);
        });

        it("should select check all when select all is clicked", () => {
            const { container } = render(<Multicheck options={TEST_OPTIONS} label={label} onChange={onChange} />);
            const selectAll = getByLabelText(container, "Select all");

            fireEvent.click(selectAll);

            expect(onChange).toHaveBeenCalled();
        });
    });
});
