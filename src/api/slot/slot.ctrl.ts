import { Slot } from '../../model';
import { Context } from 'koa';

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

const read = async (ctx: Context) => {
  const { id } = ctx.params;
  const mockingSlot: Slot = {
    'id': id,
    'drink_id': 1,
    'has_drink': true,
    'incoming_time': '2020-09-29T10:02:30+00:00',
    'row': 0,
    'column': 0,
    'depth': 0,
  };
  const mockingResponse: SlotResponse = {
    code: 200,
    data: {
      slot: mockingSlot,
    },
  };
  ctx.body = mockingResponse;
};


const list = async (ctx: Context) => {
  const mockingSlots: Slot[] = [
    {
      'id': 1,
      'drink_id': 1,
      'has_drink': true,
      'incoming_time': '2020-09-29T10:02:30+00:00',
      'row': 0,
      'column': 0,
      'depth': 0,
    },
    {
      'id': 2,
      'drink_id': 2,
      'has_drink': false,
      'incoming_time': '2020-09-29T10:02:30+00:00',
      'row': 0,
      'column': 1,
      'depth': 0,
    },
  ];
  const mockingResponse: SlotListResponse = {
    code: 200,
    data: {
      slot_list: mockingSlots,
    },
  };
  ctx.body = mockingResponse;
};
export { read, list };