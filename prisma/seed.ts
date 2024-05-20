import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const db = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash("admin", saltRounds);
  const admin = await db.user.upsert({
    where: { email: "admin@admin.ai" },
    update: {},
    create: {
      email: "admin@admin.ai",
      firstName: "Admin",
      lastName: "Admin",
      password: hashedPassword,
      bio: "An experienced System Administrator with over 8 years in IT infrastructure management. Known for a meticulous approach and proactive problem-solving, excels in network architecture, server management, and cybersecurity.",
      isAdmin: true,
      profileImage: "/images/admin.webp",
    },
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
