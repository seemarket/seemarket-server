import { getRepository } from 'typeorm';
import { ProductEntity, SlotEntity } from '../entity';
import { SlotUpdate, SlotUpdateType } from '../model/slot_update';
import { convertSlot } from '../api/slot/slot.ctrl';
import SocketIO from 'socket.io';

function shuffle(a: SlotEntity[]) {
  let j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}

const delay = async (delay: number) => {
  return new Promise(r => {
    setTimeout(r, delay);
  })
}
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

let currentID = 0;
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

const moveSlot = async (id: number) => {
  const slotRepository = getRepository(SlotEntity);

  const slotEntity = await slotRepository.findOne({ where: { id: id }, relations: ['drink'], });
  if (slotEntity === undefined) {
    return;
  }

  const moveLimitMinX = -0.4150;
  const moveLimitMaxX = 0.4280;
  const moveOffset = 0.08;
  const beforeSlotEntity = { ...slotEntity };

  const beforeSlot = convertSlot(beforeSlotEntity);
  if (getRandomInt(0, 2) == 0) {
    slotEntity.row = Math.min(Number(slotEntity.row) + moveOffset, moveLimitMaxX);
  } else {
    slotEntity.row = Math.max(Number(slotEntity.row) - moveOffset, moveLimitMinX);
  }
  await slotRepository.save(slotEntity);

  const afterSlot = convertSlot(slotEntity);

  const slotUpdate: SlotUpdate = {
    update_type : SlotUpdateType.MOVE,
    updated_slot_info : afterSlot,
    before_slot_info : beforeSlot
  };
  return slotUpdate;
};


const changeSlot = async (id: number) => {
  const slotRepository = getRepository(SlotEntity);
  const slotEntity = await slotRepository.findOne({ where: { id: id }, relations: ['drink'], });
  if (slotEntity === undefined) {
    return;
  }

  const beforeSlotEntity = { ...slotEntity };

  const beforeSlot = convertSlot(beforeSlotEntity);

  const productType = slotEntity.drink.product_type;

  const productRepository = getRepository(ProductEntity);
  const productEntities = await productRepository.find( { where : {product_type : productType} });

  const randomID = getRandomInt(0, productEntities.length);

  const newProduct = productEntities[randomID];

  console.log(newProduct);
  slotEntity.drink = newProduct;
  await slotRepository.save(slotEntity);

  const afterSlot = convertSlot(slotEntity);

  const slotUpdate: SlotUpdate = {
    update_type : SlotUpdateType.CHANGE,
    updated_slot_info : afterSlot,
    before_slot_info : beforeSlot
  };
  return slotUpdate;
};



const simulate = async (socket: SocketIO.Server, simulateID: number) => {
  const slotEntityRepository = getRepository(SlotEntity);
  const slotEntities = await slotEntityRepository.find();


  const suffledEntities = shuffle(slotEntities);
  for (const slotEntity of suffledEntities) {
    await delay(100);
    console.log(currentID);
    console.log(simulateID);
    if (simulateID !== currentID) return;
    const slotResponse = await updateSlot(slotEntity.id);
    if (slotResponse !== undefined) {
      socket.emit("update", slotResponse);
      console.log(slotResponse);
    }
  }

}

const move = async (socket: SocketIO.Server, simulateID: number) => {
  const slotEntityRepository = getRepository(SlotEntity);
  const slotEntities = await slotEntityRepository.find();

  const suffledEntities = shuffle(slotEntities.filter(slot => {
    return slot.has_drink;
  }));
  for (const slotEntity of suffledEntities) {
    await delay(100);
    if (simulateID !== currentID) return;
    if (!slotEntity.has_drink) continue;
    const slotResponse = await moveSlot(slotEntity.id);
    if (slotResponse !== undefined) {
      socket.emit("update", slotResponse);
      console.log(slotResponse);
    }
  }
}

const change = async (socket: SocketIO.Server, simulateID: number) => {
  const slotEntityRepository = getRepository(SlotEntity);
  const slotEntities = await slotEntityRepository.find();

  const suffledEntities = shuffle(slotEntities.filter(slot => {
    return slot.has_drink;
  }));

  for (const slotEntity of suffledEntities) {
    await delay(100);
    if (simulateID !== currentID) return;
    if (!slotEntity.has_drink) continue;
    const slotResponse = await changeSlot(slotEntity.id);
    if (slotResponse !== undefined) {
      socket.emit("update", slotResponse);
      console.log(slotResponse);
    }
  }
}


export const stopSimulation = (socket: SocketIO.Server) => {
  currentID = currentID + 1;
}

export const moveSimulation = (socket: SocketIO.Server) => {
  currentID = currentID + 1;
  move(socket, currentID);
}

export const changeSimulation = (socket: SocketIO.Server) => {
  currentID = currentID + 1;
  change(socket, currentID);
}

export const startSimulation = (socket: SocketIO.Server) => {
  currentID = currentID + 1;
  simulate(socket, currentID);
}
