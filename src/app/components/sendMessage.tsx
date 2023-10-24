export default function SendMeMessage() {
    return (
        <>
            <div className="flex flex-col bg-white h-fit w-[300px] rounded-xl px-4 py-2 text-blue-900 transition-all">
                <form className="flex flex-col">
                    <textarea className="bg-gray-100 my-2 rounded-md p-2 text-sm" placeholder="Send me a message..."></textarea>
                    <input type='submit' className="bg-gray-200 my-2 rounded hover:cursor-pointer hover:bg-gray-300" value="Send"></input>
                </form>
            </div>
        </>
    )
}