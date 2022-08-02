import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const categoryData: Prisma.CategoryCreateInput[] = [
  {
    name: 'Mathematics',
    questions: {
      create: [
        {
          question: '1+1',
          answer: '2',
          viewed: true,
        },
      ],
    },
  },
  {
    name: 'French',
    questions: {
      create: [
        {
          question: 'Bonjour, comment allez vous',
          answer: 'Bonjour je suis bien',
          viewed: false,
        },
      ],
    },
  },
  {
    name: 'English',
    questions: {
      create: [
        {
          question: 'Are you a boy',
          answer: 'Yes, i am.',
          viewed: false,
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const c of categoryData) {
    const category = await prisma.category.create({
      data: c,
    })
    console.log(`Created category with id: ${category.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
