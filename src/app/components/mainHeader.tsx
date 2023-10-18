export default function MainHeader () {
    return (
        <>
            <div className="border-l border-r border-b border-black border-solid">
                <h1 className="h-40">main header</h1>
                <nav className="flex justify-around">
                    <a href="/">home</a>
                    <a href="/about">about</a>
                    <a href="">link</a>
                    <a href="">link</a>
                    <a href="/new">new</a>
                    <a href="/login">login</a>
                </nav>
            </div>
        </>
    )
}