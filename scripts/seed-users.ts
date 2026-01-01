import { connectToDatabase, getUsersCollection } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

async function seedUsers() {
  try {
    console.log("Connecting to MongoDB...");
    const { db } = await connectToDatabase();

    const usersCollection = await getUsersCollection();

    // Check if demo user already exists
    const existingUser = await usersCollection.findOne({
      email: "demo@example.com",
    });

    if (existingUser) {
      console.log("Demo user already exists. Skipping seed.");
      return;
    }

    console.log("Creating demo user...");

    // Hash password
    const hashedPassword = await bcrypt.hash("demo123456", 10);

    // Create demo user
    const result = await usersCollection.insertOne({
      email: "demo@example.com",
      password: hashedPassword,
      name: "Demo User",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(`✅ Demo user created with ID: ${result.insertedId}`);
    console.log("Email: demo@example.com");
    console.log("Password: demo123456");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
}

seedUsers();
