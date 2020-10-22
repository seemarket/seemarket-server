import { Column, getRepository } from 'typeorm';
import { DrinkEntity, SlotEntity } from './entity';
import { Connection, createConnection } from 'typeorm';
createConnection().then(async connection => {

  console.log("Here you can setup and run express/koa/any other framework.");

  fetchDrinks();
}).catch(error => console.log(error));

const insertStall = async (drinkEntity: DrinkEntity, row: number, column: number, depth: number) => {
  const slotEntity = getRepository(SlotEntity);
  const slotEntitiy = await slotEntity.findOne({ where: { row, column, depth} });
  if (slotEntitiy == undefined) {
    const newSlot = new SlotEntity();
    newSlot.drink = drinkEntity;
    newSlot.has_drink = true;
    newSlot.incoming_time = new Date();
    newSlot.row = row;
    newSlot.column = column;
    newSlot.depth = depth;
    await slotEntity.save(newSlot);
  }
}



const fetchDrinks = async () => {
  const drinkRepository = getRepository(DrinkEntity);
  const drinkEntities = await drinkRepository.find();

  for (const drinkEntity of drinkEntities) {
    const id = drinkEntity.id;
    const row = id / 5;
    const column = id % 5;
    for (let depth = 0; depth < 3; depth++) {
      await insertStall(drinkEntity, row, column, depth);
    }
  }

}

