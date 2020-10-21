import Slot from './slot';

export enum SlotUpdateType {
  SOLD_OUT, // 팔림
  ARRIVED
}

export interface SlotUpdate {
  update_type : SlotUpdateType
  updated_slot_info : Slot;
  before_slot_info : Slot;
}