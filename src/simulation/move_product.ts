import SocketIO from 'socket.io';
import { getRepository } from 'typeorm';
import { ProductEntity, SlotEntity } from '../entity';
import { convertSlot } from '../api/slot/slot.ctrl';

export interface MoveCommand {
  slot_id: number;
  column: number;
  row: number;
  depth: number;
}

export const moveProduct = async (socket: SocketIO.Server, moveCommand: MoveCommand) => {
  const slotRepository = getRepository(SlotEntity);
  const slotEntity = await slotRepository.findOne(
    {
      where: { id: moveCommand.slot_id },
      relations: ['drink'],
    },
  );
  if (slotEntity === undefined) {
    console.log("NOT SUCH DATA!");
    return;
  }
  slotEntity.row = moveCommand.row;
  slotEntity.column = moveCommand.column;
  slotEntity.depth = moveCommand.depth;

  await slotRepository.save(slotEntity);
  const response = {
    code: 200,
    data: {
      slot: convertSlot(slotEntity),
    },
  };
  socket.emit("move_result", response);
  console.log(response);
};
