import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import store from "./store";
import { Provider } from "react-redux";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import colors from "./styles/colors";
import "./styles/custom.css";

// Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({ colors });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
