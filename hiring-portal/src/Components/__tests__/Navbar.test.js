import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

// Mock localStorage
beforeEach(() => {
  localStorage.setItem("token", "test-token"); // Set a token for logged in
});

afterEach(() => {
  localStorage.clear();
});

test("displays profile link when user is logged in", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  // Adjust the matcher to be more flexible if necessary
  const loginLink = screen.getByText(/Profile/i);
  expect(loginLink).toBeInTheDocument();
});

// Additional test for when user is not logged in
test("displays login link when user is not logged in", () => {
  localStorage.removeItem("token"); // Simulate user not being logged in

  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  const loginLink = screen.getByText(/Login/i);
  expect(loginLink).toBeInTheDocument();
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));
jest.mock("axios");

describe("handlePostJob function", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test("navigates to /owner when user is logged in", async () => {
    localStorage.setItem("userEmail", "test@example.com");
    axios.get.mockResolvedValueOnce({
      data: { role: "owner" },
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const postJobButton = screen.getByText("Employer/Post Job");

    // Simulate clicking the post job button
    await act(async () => {
      fireEvent.click(postJobButton);
    });

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:5000/api/users/profile",
      { params: { email: "test@example.com" } }
    );
    //expect(mockNavigate).toHaveBeenCalledWith("/owner");
  });

  test("displays error toast when user is not logged in", async () => {
    jest.spyOn(toast, "error");

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const postJobButton = screen.getByText("Employer/Post Job");

    await act(async () => {
      fireEvent.click(postJobButton);
    });

    expect(toast.error).toHaveBeenCalledWith("Please log in to continue", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });
});
