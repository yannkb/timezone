import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme } from '../styles/theme';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text.primary};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <StyledThemeProvider theme={lightTheme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
} 