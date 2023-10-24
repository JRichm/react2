export default function RightPanel() {
    return (
        <>
            <div className="flex flex-col bg-white h-fit w-[300px] rounded-xl px-6 py-4 text-blue-900 transition-all">
                <h1 className="text-xl font-bold tracking-wider">links</h1>
                <hr />
                <a href="https://JRichm.github.io" target="_blank" className="hover:text-purple-900">- portfolio</a>
                <a href="https://www.linkedin.com/in/jrichm444/" target="_blank" className="hover:text-purple-900">- linkedin</a>
                <a href="https://www.github.com/JRichm" target="_blank" className="hover:text-purple-900">- github</a>
            </div>
        </>
    )
}