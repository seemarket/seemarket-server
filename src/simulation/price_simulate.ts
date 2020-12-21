import { getRepository } from 'typeorm';
import { SlotEntity } from '../entity';
import SocketIO from 'socket.io';
import { PriceUpdate } from '../model/slot_update';
import { ProductType } from '../entity/product_entity';

const isPopular = (name: string) => {
  return "데자와" || "핫식스" || "밀키스" || "토레타" || "레드불" || "코카콜라";
}

const isNotPopular = (name: string) => {
  return "닥터페퍼" ||"써니텐" ||"미닛메이드" ||"슈웹스" ||"환타";
}


const getPrices = async () => {
  const slotEntityRepository = getRepository(SlotEntity);
  const slotEntities = await slotEntityRepository.find({ relations: ['drink'], });
  const currentSlots = slotEntities.filter(slot => {
    return slot.has_drink;
  });
  let currentPrice = 0;

  for (const slot of currentSlots) {
    switch(slot.drink.product_type) {
      case ProductType.CEREAL : {
        if(slot.column <= 0.687) {
          currentPrice += 0.5 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        } else if(slot.column <= 1.1245) {
          currentPrice += 0.3 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        } else if(slot.column <= 1.563) {
          currentPrice -= 0.05 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        } else {
          currentPrice -= 0.1 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        }
        break;
      }
      case ProductType.DRINK : {
        if(slot.column <= 0.687) {
          currentPrice -= 0.2 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        } else if (slot.column <= 1.1245) {
          currentPrice += 0.2 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        } else if (slot.column <= 1.563) {
          //3층에는 인기 없는 음료를 배치했을 경우 더 좋은 매출이 나오도록
          if(isPopular(slot.drink.title)) {
            currentPrice += (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
          } else if(isNotPopular(slot.drink.title)) {
            currentPrice += 0.6 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
          } else {
            currentPrice += 0.8 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
          }
        } else {
          if(isPopular(slot.drink.title)) {
            currentPrice += 1.3 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
          } else if(isNotPopular(slot.drink.title)) {
            currentPrice += 0.8 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
          } else {
            currentPrice += 1.0 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
          }
        }
        break;
      }
      case ProductType.SANDWICH : {
        if(slot.column <= 0.687) {
          currentPrice -= 0.05 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        } else if (slot.column <= 1.1245) {
          currentPrice += 0.3 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        } else if (slot.column <= 1.563) {
          currentPrice += 0.8 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        } else {
          currentPrice += 0.6 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        }
        break;
      }
      case ProductType.SNACK : {
        if(slot.column <= 0.687) {
          currentPrice += 0.2 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        } else if (slot.column <= 1.1245) {
          currentPrice += 0.8 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        } else if (slot.column <= 1.563) {
          currentPrice += 0.4 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        } else {
          currentPrice += 0.3 * (Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000);
        }
        break;
      }
    }

  }
  if(currentPrice < 0 ) currentPrice = 0;
  return Math.round( (currentPrice * 0.8 / 100)) * 100;
}

export const priceSimulate = async (socket: SocketIO.Server) => {

  const price = await getPrices();
  const priceOutput: PriceUpdate = {
    price: price.toLocaleString('fullwide', {useGrouping:false})
  };
  socket.emit("price", priceOutput);
  console.log(priceOutput);

}

