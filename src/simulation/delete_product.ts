import SocketIO from 'socket.io';
import { getRepository } from 'typeorm';
import { ProductEntity, SlotEntity } from '../entity';

export interface DeleteCommand {
  slot_id: number;
}

export const deleteProduct = async (socket: SocketIO.Server, deleteCommand: DeleteCommand) => {
  const slotRepository = getRepository(SlotEntity);
  await slotRepository.delete(deleteCommand.slot_id);

  const response = {
    code: 200,
    data: {
      slot_id: deleteCommand.slot_id
    },
  };
  const data = JSON.stringify(response);
  socket.emit("delete_result", data);
  console.log(data);
};
