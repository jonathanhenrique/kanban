import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  /* Indigo */
  color-scheme: dark;

  --color-grey-100: hsl(220, 14%, 96%);
  --color-grey-300: hsl(219, 15%, 63%);
  --color-grey-500: hsl(240, 12%, 20%);
  --color-grey-700: hsl(240, 15%, 15%);
  --bg-color: 	hsl(240, 4%, 11%);
  
  /* --color-brand-500: hsl(241, 47%, 48%); */
  --color-brand-500: hsl(241, 47%, 58%);
  hsl(241, 47%, 65%)

  --color-border-dark: hsl(240, 12%, 25%);
  --color-border: hsl(240, 12%, 35%);

  --backdrop-color: rgba(100,0,233,0.1);
  
  /* --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b; */

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
  --border-radius-pill: 50px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;

  --easing-in: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --easing-out: cubic-bezier(0.63, -0.34, 0.84, 0.11);

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
  font-family: "Nunito Sans", sans-serif;
  font-weight: 400;
  color: var(--color-grey-100);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.4rem;
  letter-spacing: 1.1px;
  background-color: var(--bg-color);
  background-image: url('noise-bg-soft.png');
  background-position: 0 0;
  background-size: 200px 200px;
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
  outline: 2px solid var(--color-brand-500);
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
    translate: var(--origin-x, 0) var(--origin-y, 0);
    animation-timing-function: cubic-bezier(.5,0,.38,1);
  }
  100%{
    translate: 0 0;
  }
}

@keyframes modalScale {
  0%{
    scale: .1 .05;
    animation-timing-function: cubic-bezier(.18,1.57,.68,.87);
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

`;

export default GlobalStyles;
