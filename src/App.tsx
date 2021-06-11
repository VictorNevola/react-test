import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter, Switch } from 'react-router-dom';
import theme from "./styles/theme";
import GlobalStyle from './styles/global';
import { ThemeProvider } from 'styled-components';
import RouteWrapper from './routes';

class App extends React.Component<{}> {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
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
