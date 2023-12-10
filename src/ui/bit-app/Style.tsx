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
    --bui-color-text: #cccccc;
    --bui-color-text-reverse: #101010;
    --bui-color-background: #101010;
    --bui-color-gray: #808080;
    --bui-color-gray-darker: #424242;
    --bui-color-gray-darkest: #212121;
    --bui-color-gray-lighter: #a0a0a0;
    --bui-color-gray-lightest: #d5d5d5;
  }
  `,

  // utility classes
  `
  .bui-w-full {
    width: 100%;
  }
  .bui-flex, .bui-flex-row, .bui-flex-col {
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

  // colors
  `
  .bui-fg-primary { color: var(--bui-color-primary); }
  .bui-fg-secondary { color: var(--bui-color-secondary); }
  .bui-fg-tertiary { color: var(--bui-color-tertiary); }
  .bui-fg-text { color: var(--bui-color-text); }
  .bui-fg-text-reverse { color: var(--bui-color-text-reverse); }

  .bui-bg-primary { background-color: var(--bui-color-primary); }
  .bui-bg-primary-lighter { background-color: var(--bui-color-primary-lighter); }
  .bui-bg-primary-darker { background-color: var(--bui-color-primary-darker); }
  .bui-bg-secondary { background-color: var(--bui-color-secondary); }
  .bui-bg-tertiary { background-color: var(--bui-color-tertiary); }
  .bui-bg-text { background-color: var(--bui-color-text); }
  .bui-bg-text-reverse { background-color: var(--bui-color-text-reverse); }
  .bui-bg-background { background-color: var(--bui-color-background); }
  `,

  // borders
  `
  .bui-border-debug { border: 1px solid #ff00ff; }
  .bui-border { border: 1px solid var(--bui-color-gray); }
  .bui-border-t { border-top: 1px solid var(--bui-color-gray); }
  .bui-border-r { border-right: 1px solid var(--bui-color-gray); }
  .bui-border-b { border-bottom: 1px solid var(--bui-color-gray); }
  .bui-border-l { border-left: 1px solid var(--bui-color-gray); }
  .bui-border-primary { border-color: var(--bui-color-primary); }
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
    color: var(--bui-color-text-reverse);
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
  .bui-button.bui-small {
    font-size: 1rem;
    min-width: 8rem;
    padding: 0.25rem 0.5rem;
    border-radius: ${SPACING}rem;
  }
  .bui-button.bui-medium {
    font-size: 1.5rem;
    min-width: 10rem;
    padding: 0.5rem 1rem;
  }
  `,

  // main container
  `
  .bui-main-container {
    position: fixed !important;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100000;
    pointer-events: none;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
  }
  .bui-main-container.bui-on {
    background-color: rgba(0, 0, 0, 0.8);
    pointer-events: initial;
  }
  .bui-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 10rem;
    background-color: var(--bui-color-background);
    color: var(--bui-color-text);
    border-radius: ${SPACING * 2}rem;
    border: 1px solid var(--bui-color-primary);
    overflow: hidden;
  }
  .bui-main-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 ${SPACING * 4}rem;
  }
  .bui-main-body {
    flex: 1;
    overflow: auto;
  }
  `,

  // widgets
  `
  .bui-close-button {
    border: none;
    background-color: transparent;
    color: var(--bui-color-secondary);
    cursor: pointer;
    font-size: 1.5rem;
    min-width: 44px;
    min-height: 44px;
  }
  `,
];

export function Style() {
  React.useEffect(() => {
    const cheatyDocument = eval('document') as Document & typeof globalThis;

    // remove zombie styles from previous sessions
    document.querySelectorAll('#bui-style').forEach((el) => el.remove());

    // inject styles
    const styleEl = document.createElement('style');
    styleEl.setAttribute('id', 'bui-style');
    styleEl.innerHTML = style.join('\n');
    cheatyDocument.head.appendChild(styleEl);

    // remove style on unmount
    return () => styleEl.remove();
  }, []);

  return null;
}
