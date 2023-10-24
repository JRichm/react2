import Link from 'next/link';

export default function NavHeader() {

    interface NavButtonProps {
        icon: string,
        name: string,
        link: string
    }
    
    function NavButton({icon, name, link}: NavButtonProps) {
        return (
            <Link href={link}>
                <img src={icon} alt={name} className='w-[75x] h-[75px] p-[15px] rounded-md hover:bg-white/75 transition-all color-white bg-white' />
            </Link>
        )
    }

    return (
        <>  
            <span className='flex flex-row px-4 mt-4 gap-3'>
                <NavButton icon="https://icon-library.com/images/house-icon-png-vector/house-icon-png-vector-19.jpg" name="home" link="/" />
                <NavButton icon="https://www.icanotes.com/wp-content/uploads/2023/01/4-5.png" name="new" link="/new" />
            </span>
        </>
    )
}

// home
// about
// new
// login