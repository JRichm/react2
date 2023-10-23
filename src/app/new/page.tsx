
import MainHeader from "../components/mainHeader"
import { prisma } from "@/db"
import { Textarea } from "@nextui-org/react";

export default async function NewPostPage() {
  "use server"
  async function createBlogPost(data: FormData) {
    
    const title = data.get("title")?.valueOf()
    const textData = data.get("text")?.valueOf()
    const postDate = data.get("date")?.valueOf()
    // const entryTitle = data.get("title")?.valueOf()

    if (typeof title !== "string" || title.length === 0) {
      alert('Invalid entry title')
      console.error('(!) Error creating post (Invalid entry title)');
      return;
    }

    if (typeof textData !== "string" || textData.length === 0) {
      alert('Invalid entry text')
      console.error('(!) Error creating post (Invalid entry text)');
      return;
    }

    console.log('postDate')
    console.log(postDate)
    
    // await prisma.blogPost.create({data: { title, textData, postDate }})
  }


  return (
    <>
      <div className={`flex flex-row w-full justify-center`}>
        <div className='w-[1050px]'>
          <MainHeader />
          <div className='flex flex-row justify-center gap-1 p-5 mt-28'>
            <form className="flex flex-col gap-3 w-[800px] p-3 h-fit rounded-3xl bg-white">
              <input type="text" placeholder="title" className="p-3 text-2xl tracking-wider bg-gray-200/50 rounded-xl outline-none"></input>
              <textarea className="h-[200px] max-h-[600px] p-4 bg-gray-200/50 rounded-2xl outline-none" placeholder="text"></textarea>
              <span className="flex flex-row justify-end gap-2 align-center">
                <input type="date" name="date" className="outline-none bg-gray-200/50 px-3 py-1 rounded-full"></input>
                <input type="button" value="↻" className="bg-gray-200 w-8 rounded-full hover:cursor-pointer hover:bg-gray-300"></input>
              </span>
              <span className="flex flex-row justify-between gap-3 bottom-0">
                <input type="button" value='cancel' className="bg-gray-200/50 rounded-full p-1 w-full hover:bg-red-300/50 hover:cursor-pointer"></input>
                <input type="submit" value='post' className="bg-gray-200/50 rounded-full p-1 w-full hover:bg-green-400/25 hover:cursor-pointer"></input>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}