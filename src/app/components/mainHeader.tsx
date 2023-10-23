'use client'

import { TabsProps } from '@nextui-org/react';
import { usePathname } from 'next/navigation'

export default function MainHeader () {
    function Nav() {
        const currentEnpoint = usePathname();
        const links = ['/', '/about', '/new', '/login'];
        var tabElements = new Array();

        links.forEach(tabLink => {
            if (tabLink == currentEnpoint) {
                const newTab = (<Tab tabLink={tabLink} selected={true}/>)
                tabElements.push(newTab)
            } else {
                const newTab = (<Tab tabLink={tabLink} selected={false}/>)
                tabElements.push(newTab)
            }
        })
        
        return (
            <>
                <span>
                    {tabElements}
                </span>
            </>
        )
    }

    type TabProps = {
        tabLink: string
        selected: boolean
    }

    function Tab({tabLink, selected}: TabProps) {
        var labelName = tabLink;
        if (tabLink == "/") {
            labelName = '/home'
        }

        var tabStyle = `py-2 px-4 text-l text-center mr-1 ${selected ? 'bg-white rounded-t-md' : 'bg-gray-400 rounded-t-xl'} hover:rounded-t-sm hover:bg-gray-200 transition-all`

        return(
            <>
                <a href={tabLink} className={tabStyle}>{labelName.split('/') }</a>
            </>
        )
    }

    return (
        <>
            <div className="pt-[80px] pb-3 fixed bg-green-900 w-[1050px] border-b-2 border-black/25">
                <Nav />
            </div>
        </>
    )
}