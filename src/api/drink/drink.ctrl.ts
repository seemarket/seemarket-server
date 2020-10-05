import { Drink } from '../../model';
import { Context } from 'koa';

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

const read = async (ctx: Context) => {
  const { id } = ctx.params;
  const mockingdrink: Drink = {
    'id': id,
    'type': 'big',
    'title': '사이다 뚱캔',
    'prefab_url': 'aa.prefab',
    'description': '청량한 맛이 일품',
    'price': 1000,
    'thumbnail_url': 'https://i.picsum.photos/id/894/200/300.jpg',
  };
  const mockingResponse: DrinkResponse = {
    code: 200,
    data: {
      drink: mockingdrink,
    },
  };
  ctx.body = mockingResponse;
};


const list = async (ctx: Context) => {
  const mockingdrinks: Drink[] = [
    {
      'id': 1,
      'type': 'big',
      'title': '사이다 뚱캔',
      'prefab_url': 'aa.prefab',
      'description': '청량한 맛이 일품',
      'price': 1000,
      'thumbnail_url': 'https://i.picsum.photos/id/894/200/300.jpg',
    },
    {
      'id': 2,
      'type': 'small',
      'title': '사이다 작은캔',
      'prefab_url': 'aa.prefab',
      'description': '청량한 맛이 일품',
      'price': 800,
      'thumbnail_url': 'https://i.picsum.photos/id/894/200/300.jpg',
    },
  ];
  const mockingResponse: DrinkListResponse = {
    code: 200,
    data: {
      drink_list: mockingdrinks,
    },
  };
  ctx.body = mockingResponse;
};
export { read, list };