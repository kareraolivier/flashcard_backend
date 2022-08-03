import { Context } from '../context'
exports.Category={
    questions: (_parent, _args,  context:Context) => {
      const qnCategoryId = _parent.id;
      return context.prisma.question.findMany({where:{qnCategoryId:qnCategoryId}})
    },
  }
