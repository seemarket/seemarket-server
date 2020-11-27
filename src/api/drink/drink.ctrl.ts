import { Product, NotFoundResponse, Stall } from '../../model';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { ProductEntity } from '../../entity';

interface DrinkResponse {
  code: number;
  data: {
    drink: Product;
  }
}

interface DrinkListResponse {
  code: number;
  data: {
    drink_list: Product[];
  }
}
const convertDrink = function(drinkEntity: ProductEntity): Product {
  const drink: Product = {
    id: drinkEntity.id,
    title: drinkEntity.title,
    type: drinkEntity.type,
    prefab_url: drinkEntity.prefab_url,
    description: drinkEntity.description,
    price: drinkEntity.price,
    thumbnail_url: drinkEntity.thumbnail_url,
    product_type: drinkEntity.product_type
  }
  return drink;
}
const read = async (ctx: Context) => {
  const { id } = ctx.params;

  const drinkRepository = getRepository(ProductEntity);
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
  const drinkRepository = getRepository(ProductEntity);
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