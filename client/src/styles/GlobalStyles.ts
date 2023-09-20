import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  /* Indigo */
  color-scheme: dark;

  --color-grey-100: hsl(220, 14%, 96%);
  --color-grey-300: hsl(219, 15%, 63%);
  
  --color-grey-400: hsl(240, 12%, 23%);
  --color-grey-500: hsl(240, 12%, 20%);
  --color-grey-700: hsl(240, 15%, 15%);
  --bg-color: 	hsl(240, 4%, 11%);
  
  --color-border: hsl(240, 12%, 35%);

  --color-hairline: hsl(240, 12%, 35%);

  --bezier-ease-out: cubic-bezier(0.4, 0, 0.2, 1);
  --bezier-overshoot: cubic-bezier(0,.68,.23,1.28);

  --color-1: #d73b54;
  --color-2: #cd3262;
  
  --shadow-sm: 0px 1px 2px 0px rgba(60,64,67,0.3),0px 1px 3px 1px rgba(60,64,67,0.15);
  --shadow-lg: 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12), 0 11px 15px -7px rgba(0,0,0,.2);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
  --border-radius-pill: 48px;


  --border-hairline: 1px solid hsl(240, 12%, 23%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
}

body {
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;

  font-family: "Nunito Sans", sans-serif;
  font-weight: 400;
  color: var(--color-grey-100);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.4rem;
  letter-spacing: .8px;
  background-color: var(--bg-color);

  height: 100dvh;
  width: 100%;

}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 1px solid var(--color-2);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}

@keyframes modalPopUp {
  0%{
    transform: translateY(10rem);
  }

  100%{
    transform: translateY(0);
  }
}

@keyframes modalPosition {
  0%{
    /* animation-timing-function: cubic-bezier(.40,1.60,.50,.80); */
    translate: var(--origin-x, 0) var(--origin-y, 0);
  }
  100%{
    translate: 0 0;
  }
}

@keyframes modalScale {
  0%{
    /* animation-timing-function: cubic-bezier(.40,1.60,.50,.80); */
    scale: .1;
  }

  100%{
    scale: 1;
  }
}


@keyframes modalOpacity {
  0%{
    opacity:0;
  }

  100%{
    opacity:1;
  }
}

@keyframes contentAnimation {
  0%{
    opacity:0;
  }

  100%{
    opacity:1;
  }
}

@keyframes blur {
  0%{
    backdrop-filter: blur(0);
  }

  100%{
    backdrop-filter: blur(2px);
  }
}

@keyframes formBoard {
  0%{
    transform: translateY(-120px);
  }
  100%{
    transform: translateY(0);
  }
}

@keyframes floatFormBoard {
  0%{
    transform: translateY(-400px);
  }
  100%{
    transform: translateY(0);
  }
}

@keyframes scale {
  0%{
    transform: scale(0);
  }
  100%{
    transform: scale(1);
  }
}

`;

export default GlobalStyles;
