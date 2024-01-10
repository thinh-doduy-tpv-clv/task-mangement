import { fireEvent, render, screen, within } from "@testing-library/react";
import NotFoundPage from "../../src/pages/404";
import Counter from "@/components/counter";
import { renderWithProviders } from "../utils/test-utils";
import { Provider } from "react-redux";
import store from "@/redux/store";

describe("Counter Component", () => {
  it("renders a heading", () => {
    //ARRANGE
    const { debug } = render(<NotFoundPage />);
    //debug();
    //ACT
    const heading = screen.getByRole("heading", { level: 2 });
    const text = screen.findAllByAltText("Error code: 404");

    //ASSERT
    expect(heading).toBeInTheDocument();
  });

  it("renders Counter component", () => {
    //ARRANGE
    render(
      <Provider store={store}>
        <Counter />
      </Provider>,
    );
    // renderWithProviders(<Counter />);
    expect(screen.getByTestId("text-result")).toBeInTheDocument();
    expect(screen.queryByText("0")).toBeInTheDocument();
  });

  it("Will increase count when click plus button", () => {
    //ARRANGE
    renderWithProviders(<Counter />);
    const incrementButton = screen.getByTestId("increase-btn");
    fireEvent.click(incrementButton);
    const { getByText } = within(screen.getByTestId("text-result"));
    expect(getByText("1")).toBeInTheDocument();
  });

  it("Will decrease count when click minus button", () => {
    //ARRANGE
    renderWithProviders(<Counter />);
    const decreaseBtn = screen.getByTestId("decrease-btn");
    fireEvent.click(decreaseBtn);
    expect(screen.queryByText("-1")).toBeInTheDocument();
  });
});
