import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --color-1: #f43f5e;
  --color-2: #be185d;

  --alert: #dc2626;

  &.dark{
    color-scheme: dark;

    --color-grey-100: hsl(220, 14%, 90%);
    --color-grey-300: hsl(219, 15%, 63%);  
    --color-grey-400: hsl(240, 12%, 23%);
    --color-grey-500: hsl(240, 12%, 20%);
    --color-grey-700: hsl(240, 15%, 15%);
    --bg-color: hsl(240, 4%, 11%);
   
    --color-border: hsl(240, 12%, 35%);
  
    --color-hairline: hsl(240, 12%, 23%);
  }

  &, &.light{
    color-scheme: light;

    --color-grey-100: #030712;
    --color-grey-300: #334155;  
    --color-grey-400: #e2e8f0;
    --color-grey-500: #e2e8f0;
    --color-grey-700: #f1f5f9;
    --bg-color: #f8fafc;
   
    --color-border: #e2e8f0;
  
    --color-hairline: #e2e8f0;
  }
  
  --bezier-ease-out: cubic-bezier(0.4, 0, 0.2, 1);
  --bezier-overshoot: cubic-bezier(0,.68,.23,1.28);
  --border-hairline: 1px solid var(--color-hairline);
  
  --shadow-sm: 0px 1px 2px 0px rgba(60,64,67,0.3),
               0px 1px 3px 1px rgba(60,64,67,0.15);
  
  --shadow-lg: 0 24px 38px 3px rgba(0,0,0,.14),
               0 9px 46px 8px rgba(0,0,0,.12),
               0 11px 15px -7px rgba(0,0,0,.2);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-lg: 8px;
  --border-radius-pill: 48px;
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

  transition: color 200ms, background-color 200ms;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.4rem;
  letter-spacing: .4px;
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
  outline: 1px solid var(--color-1);
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

.mb-1rem:not(:last-child){
  margin-bottom: 1rem;
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
    translate: var(--origin-x, 0) var(--origin-y, 0);
  }
  100%{
    translate: 0 0;
  }
}

@keyframes modalScale {
  0%{
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

@keyframes maskReveal {
  0%{
    clip-path: circle(0% at 0 0);
  }
  100%{
    clip-path: circle(200% at 0 0);
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

@keyframes scaleX {
  0%{
    transform: scaleX(0);
  }
  100%{
    transform: scaleX(1);
  }
}

@keyframes height {
  0%{
    height: 0;
  }
  100%{
    height: auto;
  }
}

`;

export default GlobalStyles;
