
import { Button } from '../components/Button';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from '../components/Card';
import { ContentModel } from '../components/ContentModel';
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useAddContent } from '../hooks/useAddContent';

export function Dashborad() {
    const [contentModel, setContentModel] = useState(false)
    const content = useAddContent();



    return (
        <div className='my-2 mx-2'>
            <Sidebar />
            <div className='pl-80 min-h-screen bg-[#F9FBFC] '>
                <ContentModel cla open={contentModel} onClose={() => {
                    setContentModel(false);
                }} />

                <div>
                    <div className='flex gap-3 justify-end'>
                        <Button onClick={() => {
                            setContentModel(true);
                        }} variant='secondry' text='Add Content' beforeIcon={<PlusIcon />} />



                        <Button variant='primary' text='Share Brain' beforeIcon={<ShareIcon />} />



                    </div>
                </div>
                <div className='flex gap-4 flex-wrap my-5'>

                    {content.map(({ type, title, link }) =>
                        <Card
                            title={title}
                            type={type}
                            link={link} />)}
                </div>

            </div></div>
    )
}

