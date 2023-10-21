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
        <main className='flex flex-row mr-5 bg-gray-200/20'>
          <div className='bg-gray-200/30 mr-4'>
            {blogPosts}
          </div>
          <RightPanel />
        </main>
      </div>
    </>
  )
}
