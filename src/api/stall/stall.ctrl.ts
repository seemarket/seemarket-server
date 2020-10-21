import { NotFoundResponse, Stall } from '../../model';
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { StallEntity } from '../../entity';

interface StallResponse {
  code: number;
  data: {
    stall: Stall;
  }
}

const convertStall = function(stallEntity: StallEntity): Stall {
  const stall: Stall = {
    id: stallEntity.id,
    title: stallEntity.title,
    description: stallEntity.description,
  }
  return stall;
}

const read = async (ctx: Context) => {
  const { id } = ctx.params;

  const stallRepository = getRepository(StallEntity);
  const stallEntity = await stallRepository.findOne({ where: { id: id } });
  if (stallEntity === undefined) {
    ctx.body = NotFoundResponse;
    return;
  }
  const response: StallResponse = {
    code: 200,
    data: {
      stall: convertStall(stallEntity),
    },
  };
  ctx.body = response;
};
export { read };