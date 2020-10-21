import { Drink, NotFoundResponse, Stall } from '../../model';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { DrinkEntity } from '../../entity';

interface DrinkResponse {
  code: number;
  data: {
    drink: Drink;
  }
}

interface DrinkListResponse {
  code: number;
  data: {
    drink_list: Drink[];
  }
}
const convertDrink = function(drinkEntity: DrinkEntity): Drink {
  const drink: Drink = {
    id: drinkEntity.id,
    title: drinkEntity.title,
    type: drinkEntity.type,
    prefab_url: drinkEntity.prefab_url,
    description: drinkEntity.description,
    price: drinkEntity.price,
    thumbnail_url: drinkEntity.thumbnail_url
  }
  return drink;
}
const read = async (ctx: Context) => {
  const { id } = ctx.params;

  const drinkRepository = getRepository(DrinkEntity);
  const drinkEntity = await drinkRepository.findOne({ where: { id: id } });

  if (drinkEntity === undefined) {
    ctx.body = NotFoundResponse;
    return;
  }
  const response: DrinkResponse = {
    code: 200,
    data: {
      drink: convertDrink(drinkEntity),
    },
  };
  ctx.body = response;
};


const list = async (ctx: Context) => {
  const drinkRepository = getRepository(DrinkEntity);
  const drinkEntities = await drinkRepository.find();
  const response: DrinkListResponse = {
    code: 200,
    data: {
      drink_list: drinkEntities.map(convertDrink),
    },
  };
  ctx.body = response;
};
export { read, list };