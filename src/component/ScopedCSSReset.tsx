import { Global } from '@emotion/react'
export const SCOPED_CLASS_NAME = '__ScopedReset'

const ScopedCSSReset = () => (
  <Global
    styles={`
    @property --a{
      syntax: '<angle>';
      inherits: false;
      initial-value: 0deg;
    }
    @keyframes rotateBackground {
      from {
        --a:0deg;
      }
      to {
        --a:360deg;
      }
    }
    @keyframes gradientBackground {
      0% {
        background-position: 400% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    .shiningBg {
      background-size: 400% 400%;
      animation: gradientBackground 5s linear infinite;
    }



    .rotateBgBlue {
      animation: rotateBackground 2s linear infinite;

      --a: 0deg;
      background: conic-gradient(from var(--a) at 50% 50%, #5092F5 -63.75deg, #160EF7 61.87deg, #44E9FF 168.94deg, #5092F5 296.25deg, #160EF7 421.87deg);
    }
    .rotateBgYellow {
      animation: rotateBackground 2s linear infinite;

      --a: 0deg;
      background: conic-gradient(from var(--a) at 50% 50%, #E8F550 -63.75deg, #F7C30E 61.87deg, #F8A01D 61.91deg, #FFA944 168.94deg, #E8F550 296.25deg, #F7C30E 421.87deg);
    }
    .rotateBgRainbow {
      animation: rotateBackground 2s linear infinite;

      --a: 0deg;
      background: conic-gradient(from var(--a) at 50% 50%, #E8F550 -35.62deg, #BF6EF0 35.62deg, #FFA944 136.88deg, #AD3131 245.62deg, #E8F550 324.38deg, #BF6EF0 395.63deg);
    }
    .rotateBgGreen {
      animation: rotateBackground 2s linear infinite;

      --a: 0deg;
      background: conic-gradient(from var(--a) at 50% 50%, #00A17A -63.75deg, #D1FFE5 108.35deg, #2FEF93 191.25deg, #00A17A 296.25deg, #D1FFE5 468.35deg) !important;
    }

    .btn-legend {
      background: linear-gradient(95.51deg, #BC4635 0.73%, #5C3F70 27.97%, #56D0EB 49.15%, #F1E14F 73.86%, #BC4635 97.57%);

      background-size: 400% 400%;
    }
    .btn-epic {
      background: linear-gradient(-45.15deg, #F4D35E 45.79%, #F6D972 67.74%, #FEF0BD 70.22%, #FFEDAB 72.21%, #F7DA76 74.32%, #F4D35E 81.17%);

      background-size: 400% 400%;
    }
    .btn-rare {
      background: linear-gradient(-45.15deg, #00AAE0 69.34%, #79DFFF 74.77%, #00AAE0 78.77%);

      background-size: 400% 400%;
    }
    .btn-uncommon {
      background: linear-gradient(-45.15deg, #00A146 76.9%, #53D98D 84.34%, #00A146 87.28%);

      background-size: 400% 400%;
    }
    .btn-common {
      background: black !important;
      color: white !important;
    }
    :where(.${SCOPED_CLASS_NAME}) {

      *,
      *::before,
      *::after {
        border-width: 0;
        border-style: solid;
        box-sizing: border-box;
      }
      main {
        display: block;
      }
      hr {
        border-top-width: 1px;
        box-sizing: content-box;
        height: 0;
        overflow: visible;
      }
      pre,
      code,
      kbd,
      samp {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 1em;
      }
      a {
        background-color: transparent;
        color: inherit;
        text-decoration: inherit;
      }
      abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        -webkit-text-decoration: underline dotted;
        text-decoration: underline dotted;
      }
      b,
      strong {
        font-weight: bold;
      }
      small {
        font-size: 80%;
      }
      sub,
      sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }
      sub {
        bottom: -0.25em;
      }
      sup {
        top: -0.5em;
      }
      img {
        border-style: none;
      }
      button,
      input,
      optgroup,
      select,
      textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: 1.15;
        margin: 0;
      }
      button,
      input {
        overflow: visible;
      }
      button,
      select {
        text-transform: none;
      }
      button::-moz-focus-inner,
      [type='button']::-moz-focus-inner,
      [type='reset']::-moz-focus-inner,
      [type='submit']::-moz-focus-inner {
        border-style: none;
        padding: 0;
      }
      fieldset {
        padding: 0.35em 0.75em 0.625em;
      }
      legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
      }
      progress {
        vertical-align: baseline;
      }
      textarea {
        overflow: auto;
      }
      [type='checkbox'],
      [type='radio'] {
        box-sizing: border-box;
        padding: 0;
      }
      [type='number']::-webkit-inner-spin-button,
      [type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
      }
      input[type='number'] {
        -moz-appearance: textfield;
      }
      [type='search'] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }
      [type='search']::-webkit-search-decoration {
        -webkit-appearance: none !important;
      }
      ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
      }
      details {
        display: block;
      }
      summary {
        display: list-item;
      }
      template {
        display: none;
      }
      [hidden] {
        display: none !important;
      }
      body,
      blockquote,
      dl,
      dd,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      hr,
      figure,
      p,
      pre {
        margin: 0;
      }
      button {
        background: transparent;
        padding: 0;
      }
      fieldset {
        margin: 0;
        padding: 0;
      }
      ol,
      ul {
        margin: 0;
        padding: 0;
      }
      textarea {
        resize: vertical;
      }
      button,
      [role='button'] {
        cursor: pointer;
      }
      button::-moz-focus-inner {
        border: 0 !important;
      }
      table {
        border-collapse: collapse;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: inherit;
        font-weight: inherit;
      }
      button,
      input,
      optgroup,
      select,
      textarea {
        padding: 0;
        line-height: inherit;
        color: inherit;
      }
      img,
      svg,
      video,
      canvas,
      audio,
      iframe,
      embed,
      object {
        display: block;
      }
      img,
      video {
        max-width: 100%;
        height: auto;
      }
      [data-js-focus-visible] :focus:not([data-focus-visible-added]) {
        outline: none;
        box-shadow: none;
      }
      select::-ms-expand {
        display: none;
      }
    }
  `}
  />
)

export default ScopedCSSReset
