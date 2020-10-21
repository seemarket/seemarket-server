import { NotFoundResponse, Slot, Stall } from '../../model';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { DrinkEntity, SlotEntity, StallEntity } from '../../entity';

interface SlotResponse {
  code: number;
  data: {
    slot: Slot;
  }
}

interface SlotListResponse {
  code: number;
  data: {
    slot_list: Slot[];
  }
}

export const convertSlot = function(slotEntity: SlotEntity): Slot {
  const slot: Slot = {
    id: slotEntity.id,
    drink_id: slotEntity.drink.id,
    has_drink: slotEntity.has_drink,
    incoming_time: slotEntity.incoming_time.toISOString(),
    row: slotEntity.row,
    column: slotEntity.column,
    depth: slotEntity.depth,
  };
  return slot;
};
const read = async (ctx: Context) => {
  const { id } = ctx.params;
  const slotRepository = getRepository(SlotEntity);
  const slotEntity = await slotRepository.findOne(
    {
      where: { id: id },
      relations: ['drink'],
    },
  );
  if (slotEntity === undefined) {
    ctx.body = NotFoundResponse;
    return;
  }

  const response: SlotResponse = {
    code: 200,
    data: {
      slot: convertSlot(slotEntity),
    },
  };
  ctx.body = response;
};
const list = async (ctx: Context) => {

  const slotRepository = getRepository(SlotEntity);
  const slotEntities = await slotRepository.find({
      relations: ['drink'],
    },
  );
  const response: SlotListResponse = {
    code: 200,
    data: {
      slot_list: slotEntities.map(convertSlot),
    },
  };
  ctx.body = response;
};
export { read, list };