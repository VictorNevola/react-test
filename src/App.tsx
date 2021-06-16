import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import theme from "./styles/theme";
import GlobalStyle from './styles/global';
import RouteWrapper from './routes';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component<{}> {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <ToastContainer position={"top-center"}/>
          <Switch>
              <RouteWrapper />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
