import SocketIO from 'socket.io';
import { Column, getConnection, getRepository } from 'typeorm';
import { ProductEntity, SlotBackupEntity, SlotEntity } from '../entity';
import { convertSlot } from '../api/slot/slot.ctrl';

export const initializeSimulator = async (socket: SocketIO.Server) => {
  const slotBackupRepository = getRepository(SlotBackupEntity);
  const slotRepository = getRepository(SlotEntity);

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(SlotEntity)
    .execute();
  const slotBackups = await slotBackupRepository.find({
      relations: ['drink'],
    },
  );

  await Promise.all(slotBackups.map(async(slotBackup) => {
    const slot = new SlotEntity();
    slot.drink = slotBackup.drink;
    slot.has_drink = slotBackup.has_drink;
    slot.row = slotBackup.row;
    slot.incoming_time = slotBackup.incoming_time;
    slot.column = slotBackup.column;
    slot.depth = slotBackup.depth;
    slot.drink = slotBackup.drink;
    await slotRepository.save(slot);
  }))

  const slotEntities = await slotRepository.find({
      relations: ['drink'],
    },
  );
  const response = {
    code: 200,
    data: {
      slot_list: slotEntities.map(convertSlot),
    },
  };

  socket.emit("reset_result", response);
  console.log(response);
};
