import Image from 'next/image'
import AsidePanel from './components/asidePanel'
import RightPanel from './components/rightPanel'
import BlogPost from './components/blogPost'
import MainHeader from './components/mainHeader'

export default function Home() {

  const blogPosts = (
    <>
      <BlogPost />
      <BlogPost />
      <BlogPost />
      <BlogPost />
    </>
  )

  return (
    <>
      <div className="flex flex-col w-[1050px]">
        <MainHeader />
        <main className='flex flex-row bg-black/20 mt-28'>
          <div>
            {blogPosts}
          </div>
          <div>
            <RightPanel />
          </div>
        </main>
      </div>
    </>
  )
}
