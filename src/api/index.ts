import Router from 'koa-router';
import Stall from './stall';
import Slot from './slot';
import Drink from './drink';
const api = new Router();

api.use('/drink', Drink.routes());
api.use('/slot', Slot.routes());
api.use('/stall', Stall.routes());

export default api;