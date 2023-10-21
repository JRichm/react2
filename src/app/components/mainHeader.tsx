export default function MainHeader () {

    function NavBar() {
        const links = ['', 'about', 'new', 'login']

        return (
            <>
                <span className="flex flex-row h-fit w-full roun">
                    {links.map(tabLink => (
                        <Tab tabLink={tabLink} />
                    ))}
                </span>
            </>
        )
    }

    type TabProps = {
        tabLink: string
    }

    function Tab({tabLink}: TabProps) {

        const tabStyle = `bg-white w-[85px] py-1 text-center mr-1`

        if (tabLink == "") {
            return <a href={`/${tabLink}`} className={tabStyle}>home</a>
        } else {
            return <a href={`/${tabLink}`} className={tabStyle}>{tabLink}</a>
        }

    }

    return (
        <>
            <div className="h-fit mt-[100px]">
                <NavBar />

                {/* <nav className="flex justify-around">
                    <a href="/">home</a>
                    <a href="/about">about</a>
                    <a href="" className="text-gray-300">link</a>
                    <a href="" className="text-gray-300">link</a>
                    <a href="/new">new</a>
                    <a href="/login">login</a>
                </nav> */}

            </div>
        </>
    )
}