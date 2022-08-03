import { Context } from '../context'
// import Schema from '../schema'

exports.Query={
    allCategorys:(_parent, _args,  context:Context)=>{
      return context.prisma.category.findMany()
    },
    allQuestions:(_parent, _args,  context:Context)=>{
      return context.prisma.question.findMany()
    },
    singleQuestion:(_parent, _args,  context:Context)=>{
      return context.prisma.question.findUnique({where:{id:_args.id}})
    },
  
    singleCategory:(_parent, _args,  context:Context)=>{
        return context.prisma.category.findUnique({where:{id:_args.id}})
    },
   
  }