import { getRepository } from 'typeorm';
import { SlotEntity } from '../entity';
import { SlotUpdate, SlotUpdateType } from '../model/slot_update';
import { convertSlot } from '../api/slot/slot.ctrl';
import WebSocket from 'ws';

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

const simulate = async (ws: WebSocket) => {
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
      const data = JSON.stringify(slotResponse);
      ws.send(data);
      console.log(data);
    }
  }

}

export const startSimulation = (ws: WebSocket) => {
  simulate(ws);
}