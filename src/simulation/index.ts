import { Socket } from 'socket.io';
import { createConnection, getRepository } from 'typeorm';
import { SlotEntity } from '../entity';
import { SlotUpdate, SlotUpdateType } from '../model/slot_update';
import { convertSlot } from '../api/slot/slot.ctrl';
createConnection().then(async connection => {

  console.log("Here you can setup and run express/koa/any other framework.");

  fetchSlots();
}).catch(error => console.log(error));


const updateSlot = async (id: number) => {
  const slotRepository = getRepository(SlotEntity);
  const slotEntity = await slotRepository.findOne({ where: { id: id }, relations: ['drink'], });
  if (slotEntity === undefined) {
    return;
  }

  const beforeSlotEntity = { ...slotEntity };

  const beforeSlot = convertSlot(beforeSlotEntity);
  const hasDrink = slotEntity.has_drink;
  const update_type: SlotUpdateType = hasDrink ? SlotUpdateType.SOLD_OUT : SlotUpdateType.ARRIVED;

  slotEntity.has_drink = !hasDrink;

  await slotRepository.save(slotEntity);

  const afterSlot = convertSlot(slotEntity);

  const slotUpdate: SlotUpdate = {
    update_type : update_type,
    updated_slot_info : afterSlot,
    before_slot_info : beforeSlot
  };
  return slotUpdate;
};

const fetchSlots = async () => {
  const slotEntityRepository = getRepository(SlotEntity);
  const slotEntities = await slotEntityRepository.find();

  const delay = async (delay: number) => {
    return new Promise(r => {
      setTimeout(r, delay);
    })
  }

  for (const slotEntity of slotEntities) {
    await delay(1000);
    const slotResponse = await updateSlot(slotEntity.id);
    if (slotResponse !== undefined) {
      console.log(slotResponse);
    }
  }

}

const socketExecutor = (socket: Socket) => {

  // convenience function to log server messages on the client
  function log(input: string) {
    console.log(input);
    socket.emit('log', input);
  }

  socket.on('join', function(room) {
    log('You Successfully connected!');
  });



};