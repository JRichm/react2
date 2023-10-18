import Image from 'next/image'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesome } from '@fortawesome/react-fontawesome'

export default function AsidePanel() {
    return (
        <>
            <div className="border-r border-b border-black border-solid p-2 h-full">
                <Image className="bg-black" alt='test image not found' src="" width={200} height={200}></Image>
                <h1>test header for image</h1>
                <hr />
                <span>
                    <FontAwesomeIcon icon="fa-brands fa-github"></FontAwesomeIcon>
                </span>
            </div>
        </>
    )
}