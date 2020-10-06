import Router from 'koa-router';
import { read, list } from './drink.ctrl';
const drink = new Router();

drink.get('/:id', read);
drink.get('/', list);
export default drink;