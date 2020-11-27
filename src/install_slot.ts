import { getRepository } from 'typeorm';
import { ProductEntity, SlotEntity } from './entity';
import { createConnection } from 'typeorm';
createConnection().then(async connection => {

  console.log("Here you can setup and run express/koa/any other framework.");

  fetchDrinks();
}).catch(error => console.log(error));

const insertStall = async (drinkEntity: ProductEntity, row: number, column: number, depth: number) => {
  const slotEntityRepository = getRepository(SlotEntity);
  const slotEntity = await slotEntityRepository.findOne({ where: { row, column, depth} });
  if (slotEntity == undefined) {
    const newSlot = new SlotEntity();
    newSlot.drink = drinkEntity;
    newSlot.has_drink = true;
    newSlot.incoming_time = new Date();
    newSlot.row = row;
    newSlot.column = column;
    newSlot.depth = depth;
    await slotEntityRepository.save(newSlot);
  }
}



const fetchDrinks = async () => {
  const drinkRepository = getRepository(ProductEntity);
  const drinkEntities = await drinkRepository.find();

  const drinkSize = drinkEntities.length;
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 12; column++) {
      for (let depth = 0; depth < 4; depth++) {
       const drink = drinkEntities[(row+ column) % 7];
       await insertStall(drink, row, column, depth);
      }
    }
  }

}

