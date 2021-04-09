import './style.css'
import { loadPage } from './viteProxy';

const mode = import.meta.env.MODE;

if (mode !== 'production') {
  loadPage();
}
