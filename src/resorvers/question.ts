import { Context } from '../context'

exports.Question={
    qnCategory: (_parent, _args,  context:Context) => {
      const questionId = _parent.qnCategoryId;
      return context.prisma.category.findUnique({where:{id:questionId}})
    },
  }