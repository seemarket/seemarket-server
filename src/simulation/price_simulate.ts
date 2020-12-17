import { getConnection, getRepository } from 'typeorm';
import { SlotBackupEntity, SlotEntity } from '../entity';
import SocketIO from 'socket.io';
import { convertSlot } from '../api/slot/slot.ctrl';
import { PriceUpdate } from '../model/slot_update';

const getPrices = async () => {
  const slotEntityRepository = getRepository(SlotEntity);
  const slotEntities = await slotEntityRepository.find({ relations: ['drink'], });
  const currentSlots = slotEntities.filter(slot => {
    return slot.has_drink;
  });
  let currentPrice = 0;
  for (const slot of currentSlots) {
    currentPrice += Number(slot.drink.price) * ( 0.5 - Number(slot.depth)) * 1000;
  }
  return currentPrice;
}

export const priceSimulate = async (socket: SocketIO.Server) => {

  const price = await getPrices();
  const priceOutput: PriceUpdate = {
    price: price
  };
  socket.emit("price", priceOutput);
  console.log(priceOutput);

}