import { render } from "@testing-library/react-native";

import HomeScreen from "@moeum/app/index";

// rendering test
test("renders correctly", () => {
  const { getByText } = render(<HomeScreen />);
  expect(getByText("Home Screen")).toBeTruthy();
});

// interaction test
// test("button press changes text", () => {
//   const { getByText, getByTestId } = render(<HomeScreen />);
//   userEvent.press(getByText("Press me"));
//   expect(getByTestId("textId").props.children).toBe("Button Pressed");
// });
