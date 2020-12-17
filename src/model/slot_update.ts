import Slot from './slot';

export enum SlotUpdateType {
  SOLD_OUT = "sold_out", // 팔림
  ARRIVED = "arrived", // 도착
  MOVE = "move", // 이동
  CHANGE = "change" // 변경
}

export interface SlotUpdate {
  update_type : SlotUpdateType
  updated_slot_info : Slot;
  before_slot_info : Slot;
}

export interface PriceUpdate {
  price: number;
}