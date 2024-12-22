import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FirstPage from "../pages/firstPage.js";
import { api } from "../service/apiServiceCall.js";

jest.mock("../service/apiServiceCall");

const mockData = [
  { "percentage.funded": 186, "amt.pledged": 15283, "S.No": 1 },
  { "percentage.funded": 120, "amt.pledged": 10000, "S.No": 2 },
  { "percentage.funded": 150, "amt.pledged": 20000, "S.No": 3 },
  { "percentage.funded": 90, "amt.pledged": 5000, "S.No": 4 },
  { "percentage.funded": 200, "amt.pledged": 30000, "S.No": 5 },
  { "percentage.funded": 250, "amt.pledged": 40000, "S.No": 6 },
];

beforeEach(() => {
  api.mockResolvedValue(mockData);
});

afterEach(() => {
  jest.clearAllMocks(); 
});
describe("FirstPage Component", () => {
  it("renders the table and fetches data", async () => {
    render(<FirstPage />);
    await waitFor(() => expect(api).toHaveBeenCalledTimes(1));
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("186")).toBeInTheDocument()
    );
    expect(screen.getByText("15283")).toBeInTheDocument();
  });

  it("displays correct pagination buttons", async () => {
    render(<FirstPage />);
    await waitFor(() => expect(api).toHaveBeenCalledTimes(1));
    const prevButton = screen.getByLabelText("Previous Page");
    const nextButton = screen.getByLabelText("Next Page");
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it("navigates to the next page", async () => {
    render(<FirstPage />);
    await waitFor(() => expect(api).toHaveBeenCalledTimes(1));
    const nextButton = screen.getByLabelText("Next Page");
    fireEvent.click(nextButton);
    await waitFor(() => expect(screen.getByText("250")).toBeInTheDocument());
    expect(screen.getByText("40000")).toBeInTheDocument();
  });

  it("stays on the same page if 'Next' is not clicked", async () => {
    render(<FirstPage />);
    await waitFor(() => expect(api).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText("200")).toBeInTheDocument());
    expect(screen.getByText("30000")).toBeInTheDocument();
  });

  it("navigates back to the previous page", async () => {
    render(<FirstPage />);
    await waitFor(() => expect(api).toHaveBeenCalledTimes(1));
    const nextButton = screen.getByLabelText("Next Page");
    fireEvent.click(nextButton);
    const prevButton = screen.getByLabelText("Previous Page");
    fireEvent.click(prevButton);
    await waitFor(() => expect(screen.getByText("186")).toBeInTheDocument());
    expect(screen.getByText("15283")).toBeInTheDocument();
  });
});
