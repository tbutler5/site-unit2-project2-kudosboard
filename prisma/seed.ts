import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

const boardCategories: Category[] = ['CELEBRATION', 'THANK_YOU', 'INSPIRATION'];

const randomImage = (i: number) => `https://picsum.photos/seed/board${i}/300/200`;

const inspirationalMessages = [
  "You’re amazing! Keep it up 💪",
  "Your energy is contagious ✨",
  "The world needs your light 🌟",
  "Never stop believing in yourself 🔥",
  "You make a difference every day ❤️",
  "Keep pushing forward 🚀",
  "You are unstoppable 🦾",
  "Your dedication is inspiring 💼",
  "You're doing better than you think 🌈",
  "You are appreciated more than you know 🙏"
];

const gifUrls = [
  "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  "https://media.giphy.com/media/3ohs7KViFBEUvBzWgo/giphy.gif",
  "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
  "https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif",
  "https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif"
];

async function main() {
  console.log(`🌱 Seeding database...`);

  // Clear old data
  await prisma.card.deleteMany();
  await prisma.board.deleteMany();

  for (let i = 1; i <= 15; i++) {
    const board = await prisma.board.create({
      data: {
        title: `${boardCategories[i % boardCategories.length]} Board`,
        category: boardCategories[i % boardCategories.length],
        author: `User${i}`,
        imageUrl: randomImage(i)
      }
    });

    // Create 2–4 cards per board
    const cardCount = Math.floor(Math.random() * 3) + 8;
    for (let j = 0; j < cardCount; j++) {
      await prisma.card.create({
        data: {
          title: `Card Title ${j + 1}`,
          message: inspirationalMessages[Math.floor(Math.random() * inspirationalMessages.length)],
          gifUrl: gifUrls[Math.floor(Math.random() * gifUrls.length)],
          boardId: board.id,
          author: `Jane${j}`
        }
      });
    }
  }

  console.log(`✅ Seed complete.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
