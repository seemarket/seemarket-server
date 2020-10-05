import Router from 'koa-router';
import { read, list } from './slot.ctrl';
const slot = new Router();

slot.get('/:id', read);
slot.get('/', list);
export default slot;