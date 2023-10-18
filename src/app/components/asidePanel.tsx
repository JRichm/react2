import Image from 'next/image'

import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function AsidePanel() {
    return (
        <>
            <div className="border-r border-b border-black border-solid p-2 h-full">
                <Image className="bg-black m-3" alt='test image not found' src="" width={150} height={150}></Image>
                <h1>test header for image</h1>
                <hr />
                <span>
                </span>
            </div>
        </>
    )
}