import { define, render } from 'hybrids';

import React from 'react';
import ReactDOM from 'react-dom';

// Simple React component
import WebComponent from './App';

// This function creates update callback, which uses react-dom
// to render content in shadowRoot of the custom element.
// For production use it should support ShadyCSS polyfill
// to properly distribute styles in custom element rendered by React
function reactify(fn) {

  return render(
    (host) => {
      const Component = fn(host);
      return (host, target) => {
        return ReactDOM.render(Component, target);
      };
    },
    { shadowRoot: false },
  );
}

const CurrentWebComponent = {
  render: reactify(props => <WebComponent {...props} />),
};

define('webcomponent-example', CurrentWebComponent);

