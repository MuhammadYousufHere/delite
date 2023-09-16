import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  await prisma.user.deleteMany()
  await prisma.post.deleteMany()

  console.log('Seeding...')

  const user1 = await prisma.user.create({
    data: {
      email: 'lar@sim.com',
      firstname: 'Laraib',
      lastname: 'Hashim',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'USER',
      posts: {
        create: {
          title: 'Join us for Prisma Day 2019 in Berlin',
          content: 'https://www.prisma.io/day/',
          published: true,
          description: 'a detailed description',
          slug: 'http://example.com/sample-post/'
        }
      }
    }
  })
  const user2 = await prisma.user.create({
    data: {
      email: 'bart@simpson.com',
      firstname: 'Babar',
      lastname: 'Azam',
      role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
            description: 'a detailed description',
            slug: 'http://example.com/sample-post/'
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: false,
            description: 'a detailed description',
            slug: 'http://example.com/sample-post/'
          }
        ]
      }
    }
  })

  console.log({ user1, user2 })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
