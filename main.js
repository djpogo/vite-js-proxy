import './style.css'

/* * * * vite-proxy do not remove!!! * * * */
import loadPage from './vite.proxy';
loadPage();
/* * * * end of vite-proxy * * * */

import moduleA from './js/module-a';

moduleA();