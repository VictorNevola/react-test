import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secundary: string;
      error: string;

      background: string;
      backgroundSecundary: string;
      backgroundBtn: string,

      text: string;
      textHighlighted: string;
      textOpacity: string
    }
  
    border: {
      default: string,
      inputFocus: string
    },
  
    transiton: {
      default: string
    },

    wrapper: {
      position: string,
      "max-width": string,
      margin: string,
      padding: string
    }
  }
}