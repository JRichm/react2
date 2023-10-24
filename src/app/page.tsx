import Image from 'next/image'
import AsidePanel from './components/asidePanel'
import RightPanel from './components/rightPanel'
import BlogPost from './components/blogPost'
import MainHeader from './components/mainHeader'
import NavHeader from './components/navHeader'
import { prisma } from "@/db"

async function getBlogPosts() {
  const blogPosts = await prisma.blogPost.findMany({
    orderBy: {
      postDate: 'desc'
    },
    where: {
      postVisible: true
    }
  })

  const postElements = new Array()

  blogPosts.forEach(post => {
    postElements.push(<BlogPost postData={post} />)
  })

  return postElements
}

export default async function Home() {

  const postsElements = await getBlogPosts()

  return (
    <>
      <div className="flex flex-col w-[1050px]">
        {/* <MainHeader /> */}
        <main className='flex flex-row bg-black/20'>
          <div>
            <NavHeader />
            {postsElements}
          </div>
          <div>
            <RightPanel />
          </div>
        </main>
      </div>
    </>
  )
}
