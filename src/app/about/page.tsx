import MainHeader from "../components/mainHeader"

export default function() {
    return (
        <>
          <div className="flex flex-col w-[1050px]">
            <MainHeader />
            <main className='flex flex-row mr-5 bg-gray-200/20'>
                <h1>about</h1>
            </main>
          </div>
        </>
      )
}