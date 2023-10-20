import MainHeader from "../components/mainHeader"
import {Textarea} from "@nextui-org/react";

export default function NewPostPage() {
    return (
        <>
          <div className='flex flex-row w-full justify-center h-full'>
            <div className='w-[900px]'>
              <MainHeader />
              <div className='flex flex-row justify-center border border-solid border-black border-t-0 h-full'>
                <form className="flex flex-col gap-3 w-full p-20">
                  <input type="text" placeholder="title" className="p-2 text-2xl tracking-wider bg-gray-100/50 rounded-2xl border-gray-300 border-2 outline-none"></input>
                  <textarea className="h-[200px] max-h-[600px] p-4 bg-gray-100/50 rounded-2xl border-gray-300 border-2 outline-none" placeholder="text"></textarea>
                  <span className="flex flex-row justify-between gap-3">
                    <input type="button" value='cancel' className="bg-gray-100/50 rounded-xl border-gray-300 border-2 p-1 w-full hover:bg-red-300/50 hover:cursor-pointer"></input>
                    <input type="submit" value='post' className="bg-gray-100/50 rounded-xl border-gray-300 border-2 p-1 w-full hover:bg-green-400/25 hover:cursor-pointer"></input>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </>
    )
}