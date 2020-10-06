import { Stall } from '../../model';
import { Context } from 'koa';

interface StallResponse {
  code: number;
  data: {
    stall: Stall;
  }
}

const read = async (ctx: Context) => {
  const { id } = ctx.params;
  const mockingStall: Stall = {
    id: id,
    title: "아랫공대 CU 편의점",
    description: "음료매대 좋아",
  };

  const mockingResponse: StallResponse = {
    code: 200,
    data: {
      stall: mockingStall
    }
  };
  ctx.body = mockingResponse;
}
export { read };