import Image from 'next/image'
import AsidePanel from './components/asidePanel'
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
      <div className='flex flex-row w-full justify-center'>
        <div className='w-[900px]'>
          <MainHeader />
          <div className='flex flex-row justify-center'>
            <div>
              {blogPosts}
            </div>
            <AsidePanel />
          </div>
        </div>
      </div>
    </>
  )
}
