"use server"
import { prisma } from "@/db"

export async function AddPost(data: FormData) {
    const title = data.get("title")?.toString() ?? '';
    const text = data.get("text")?.toString() ?? '';
    const date = data.get("date")?.toString() ?? '';
  
    console.log('\t\nnew note to add');
    console.log(title)
    console.log(text)
  
    if (typeof title !== "string" || title.length === 0) {
      console.error("Invalid Title");
    } else if (typeof text !== "string" || text.length === 0) {
      console.error("Invalid Text Body");
    }
  
    await prisma.blogPost.create({
      data: {
        title: title,
        textData: text,
        postDate: date
      }
    })
  }