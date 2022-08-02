import { gql } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'


export const typeDefs = gql`

  type Category {
    id: ID
    name: String!
    questions: [Question!]!
  }
  type Question {
    qnCategory: Category
    question: String!
    answer: String!
    createdAt: DateTime!
    id: ID
    viewed: Boolean!
    updatedAt: DateTime!
    viewCount: Int!
    qnCategoryId: String
  }
  input CategoryCreateInput {
    name: String!
  }
  input QuestionCreateInput {
    qnCategoryId: String!
    question: String!
    answer: String!
  }
  input CategoryUniqueUpdateInput{
    name: String
  }
  input QuestionUniqueUpdateInput{
    qnCategoryId: String!
    question: String
    answer: String
  }
 
  input CategoryUniqueInput {
    id: String!
  }

  input QuestionUniqueInput {
    id: String!
  }

  type Query {
    allCategorys: [Category!]!
    allQuestions: [Question!]!
    singleCategory(id:ID): Category
    singleQuestion(id:ID): Question 
  }

  type Mutation{
    categoryCreate(input: CategoryCreateInput!):Category
    questionCreate(input: QuestionCreateInput!):Question
    categoryUpdate(input: CategoryUniqueUpdateInput!):Category
    questionUpdate(input: QuestionUniqueUpdateInput!):Question
    categoryDelete(input: CategoryUniqueInput!):Category
    questionDelete(input: QuestionUniqueInput!):Question
    
  }
  scalar DateTime
`

export const resolvers = {
  Query:{
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
   
  },
  
  Category:{
    questions: (_parent, _args,  context:Context) => {
      const qnCategoryId = _parent.id;
      return context.prisma.question.findMany({where:{qnCategoryId:qnCategoryId}})
    },
  },

  Question:{
    qnCategory: (_parent, _args,  context:Context) => {
      const questionId = _parent.qnCategoryId;
      return context.prisma.category.findUnique({where:{id:questionId}})
    },
  },


  Mutation:{
    categoryCreate:async (_parent, _args,  context:Context) =>{ 
      return await context.prisma.category.create({data:{
        id:_args.input.id,
        name:_args.input.name
      }})  
    },
    questionCreate:async (_parent, _args,  context:Context) =>{ 
      return await context.prisma.question.create({data:{
        qnCategoryId:_args.qnCategoryId,
        question:_args.input.question,
        answer:_args.input.answer
      }})  
    },
    questionUpdate:async (_parent, _args,  context:Context)=>{
      return await context.prisma.question.update({where:{id:_args.input.id},data:{ 
        id:_args.input.id,
        question:_args.input.question,
        answer:_args.input.answer}})
    },

    categoryUpdate:async(_parent, _args,  context:Context)=>{
        return await context.prisma.category.update({where:{id:_args.input.id},data:{
          name:_args.input.name}})
    },
    questionDelete:async (_parent, _args,  context:Context)=>{
      return await context.prisma.question.delete({where:{id:_args.id}})
    },

    categoryDelete:async(_parent, _args,  context:Context)=>{
        return await context.prisma.category.delete({where:{id:_args.id}})
    },    
  }
 
 
}
