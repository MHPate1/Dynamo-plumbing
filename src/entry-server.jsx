import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Rendered at build time to bake the real page content (H1, copy, links) into
// the served HTML so crawlers that don't execute JS (e.g. Bing) still see it.
export function render() {
  return renderToString(<App />);
}
