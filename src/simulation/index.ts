import { Socket } from 'socket.io';
import { getRepository } from 'typeorm';
import { SlotEntity } from '../entity';
import { SlotUpdate, SlotUpdateType } from '../model/slot_update';
import { convertSlot } from '../api/slot/slot.ctrl';
import Slot from '../model/slot';


const updateSlot = async (id: number, socket: Socket) => {
  const slotRepository = getRepository(SlotEntity);
  const slotEntity = await slotRepository.findOne({ where: { id: id } });
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
  socket.emit("slot_update", slotUpdate);
};


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