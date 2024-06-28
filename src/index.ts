import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hi from the server!" });
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    res.json({ posts });
  } catch (error: any) {
    res.json({ message: error.message, type: error.type });
  }
});

app.get("/authors", async (req, res) => {
  try {
    const authors = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    res.json({ authors });
  } catch (error: any) {
    res.json({ message: error.message, type: error.type });
  }
});

app.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
    res.json({ user });
  } catch (error: any) {
    res.json({ message: error.message, type: error.type });
  }
});

app.post("/post", async (req, res) => {
  const body = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        author: {
          connect: {
            id: body.id,
          },
        },
      },
    });
    res.json({ post });
  } catch (error: any) {
    res.json({ message: error.message, type: error.type });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
