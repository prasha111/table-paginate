import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FirstPage from "../pages/firstPage.js";

beforeEach(() => {
  // Mock global fetch API
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { "percentage.funded": 186, "amt.pledged": 15283, "S.No":1 },
          { "percentage.funded": 120, "amt.pledged": 10000, "S.No":2 },
          { "percentage.funded": 150, "amt.pledged": 20000, "S.No":3  },
          { "percentage.funded": 90, "amt.pledged": 5000, "S.No":4  },
          { "percentage.funded": 200, "amt.pledged": 30000, "S.No":5  },
          { "percentage.funded": 250, "amt.pledged": 40000, "S.No":6  },
        ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks(); 
});

describe("FirstPage Component", () => {
  it("renders the table and fetches data", async () => {
    render(<FirstPage />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();
 
  });

  it("displays correct pagination buttons", async () => {
    render(<FirstPage />);
    
    
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    
    const prevButton = screen.getByLabelText("Previous Page");
    const nextButton = screen.getByLabelText("Next Page");
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument()

    //expect(prevButton).toBeDisabled(); 
    //expect(nextButton).not.toBeDisabled(); 
  });

  it("navigates to the next page", async () => {
    render(<FirstPage />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const nextButton = screen.getByLabelText("Next Page");
    fireEvent.click(nextButton);

    await waitFor(() => expect(screen.getByText("250")).toBeInTheDocument());
    expect(screen.getByText("30000")).toBeInTheDocument();
  });
});
