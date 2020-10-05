import Router from 'koa-router';
import { read } from './stall.ctrl';
const stall = new Router();

stall.get('/:id', read);
export default stall;