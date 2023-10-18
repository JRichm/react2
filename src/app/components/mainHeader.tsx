export default function MainHeader () {
    return (
        <>
            <div className="border-l border-r border-b border-black border-solid">
                <h1 className="h-32">main header</h1>
                <nav className="flex justify-around">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="">Link</a>
                    <a href="">Link</a>
                    <a href="">Link</a>
                    <a href="/login">Login</a>
                </nav>
            </div>
        </>
    )
}