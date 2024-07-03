import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }
    
    * {
        margin: 0;
    }
    
    body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }
    
    input, button, textarea, select {
        font: inherit;
    }
    
    p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
    }
`
