import { TwitterLogo } from '../icons/TwitterIcon';
import { YoutubeIcon } from '../icons/YoutubeIcon';
import { SideBaItem } from './SideBarItem';
import { Logo } from './../icons/Logo';
export function Sidebar() {
    return <div className="h-screen w-72 bg-white border-r-2 border-r-gray-300 fixed top-0 left-0">
        <div className='mb-4 flex items-center text-2xl pl-3.5 gap-2.5 mt-5'>
            <div className='text-[#5046E2] cursor-pointer'>
                <Logo />
            </div>
            <h2 className='font-mono'>
                Brainly
            </h2>
        </div>

        <div className='pl-4'>
            <SideBaItem icon={<TwitterLogo />} text='tweets' />
            <SideBaItem icon={<YoutubeIcon />} text='Videos' />
        </div>
    </div>
}