import SocketIO from 'socket.io';
import { getConnection, getRepository } from 'typeorm';
import { ProductEntity, SlotBackupEntity, SlotEntity } from '../entity';
import { convertSlot } from '../api/slot/slot.ctrl';

export interface CreateCommand {
  product_id: number;
  row: number;
  column: number;
  depth: number;
}

export const createProduct = async (socket: SocketIO.Server, createCommand: CreateCommand) => {
  const slotRepository = getRepository(SlotEntity);
  const productRepository = getRepository(ProductEntity);

  const product = await productRepository.findOne(createCommand.product_id);
  if (product === undefined) {
    console.log("NOT Found Drink!");
    return;
  }
  const slot = new SlotEntity();
  slot.incoming_time = new Date();
  slot.column = createCommand.column;
  slot.depth = createCommand.depth;
  slot.row = createCommand.row;
  slot.has_drink = true;
  slot.drink = product;
  await slotRepository.insert(slot);
  const response = {
    code: 200,
    data: {
      slot: convertSlot(slot),
    },
  };
  socket.emit("create_result", response);
  console.log(response);
};
