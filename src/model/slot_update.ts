import Slot from './slot';

export enum SlotUpdateType {
  SOLD_OUT = "sold_out", // 팔림
  ARRIVED = "arrived"
}

export interface SlotUpdate {
  update_type : SlotUpdateType
  updated_slot_info : Slot;
  before_slot_info : Slot;
}