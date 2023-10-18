import Image from 'next/image'

import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function AsidePanel() {
    return (
        <>
            <div className="border-r border-b border-black border-solid p-2 h-full w-[500px]">
                <Image className="bg-black m-3" alt='test image not found' src="" width={100} height={100}></Image>
                <h1>test header for image</h1>
                <hr />
                <span>
                </span>
            </div>
        </>
    )
}