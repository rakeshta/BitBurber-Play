import { React } from '/ui/lib/react';

const SPACING = 0.25;
const SPACING_COUNT = 10;

const style = [
  // theme
  `
  :root {
    --bui-color-primary: #ffd700;
    --bui-color-primary-lighter: #ffe033;
    --bui-color-primary-darker: #ccac00;
    --bui-color-secondary: #a7ff00;
    --bui-color-tertiary: #ff5700;
    --bui-color-text: #101010;
  }
  `,

  // utility classes
  `
  .bui-w-full {
    width: 100%;
  }
  .bui-flex {
    display: flex;
  }
  .bui-flex-row {
    flex-direction: row;
  }
  .bui-flex-col {
    flex-direction: column;
  }
  .bui-items-center {
    align-items: center;
  }
  .bui-justify-center {
    justify-content: center;
  }
  .bui-flex-1 {
    flex: 1;
  }
  `,

  // spacing
  ...Array(SPACING_COUNT)
    .fill(0)
    .map(
      (_, i) => `
  .bui-m-${i} { margin: ${i * SPACING}rem; }
  .bui-mt-${i} { margin-top: ${i * SPACING}rem; }
  .bui-mr-${i} { margin-right: ${i * SPACING}rem; }
  .bui-mb-${i} { margin-bottom: ${i * SPACING}rem; }
  .bui-ml-${i} { margin-left: ${i * SPACING}rem; }
  .bui-mx-${i} { margin-left: ${i * SPACING}rem; margin-right: ${i * SPACING}rem; }
  .bui-my-${i} { margin-top: ${i * SPACING}rem; margin-bottom: ${i * SPACING}rem; }
  .bui-p-${i} { padding: ${i * SPACING}rem; }
  .bui-pt-${i} { padding-top: ${i * SPACING}rem; }
  .bui-pr-${i} { padding-right: ${i * SPACING}rem; }
  .bui-pb-${i} { padding-bottom: ${i * SPACING}rem; }
  .bui-pl-${i} { padding-left: ${i * SPACING}rem; }
  .bui-px-${i} { padding-left: ${i * SPACING}rem; padding-right: ${i * SPACING}rem; }
  .bui-py-${i} { padding-top: ${i * SPACING}rem; padding-bottom: ${i * SPACING}rem; }
  `,
    ),

  // rounded corners
  `
  .bui-rounded-xs { border-radius: ${SPACING}rem; }
  .bui-rounded-md, .bui-rounded { border-radius: ${SPACING * 2}rem; }
  .bui-rounded-lg { border-radius: ${SPACING * 4}rem; }
  `,

  // button
  `
  .bui-button {
    border: none;
    color: var(--bui-color-text);
    background-color: var(--bui-color-primary);
    border-radius: ${SPACING * 2}rem;
    cursor: pointer;
  }
  .bui-button:hover {
    background-color: var(--bui-color-primary-lighter);
  }
  .bui-button:active {
    background-color: var(--bui-color-primary-darker);
  }
  .bui-button.bui-medium {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
  }
  `,
];

/* button */

export function Style() {
  return <style>{style}</style>;
}
