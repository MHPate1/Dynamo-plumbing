import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { locations } from './data/locations.js';

// Rendered at build time to bake the real page content (H1, copy, links) into
// the served HTML so crawlers that don't execute JS (e.g. Bing) still see it.
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}

export { locations };
