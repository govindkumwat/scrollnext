import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import DetailPage from './DetailPage';


const ImageList = ({ data, handlePopup }) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedData, setSelectedData] = useState({});

    
    const openPopup = (permalink, title, url_overridden_by_dest) => {
        setSelectedData({ permalink, title, url_overridden_by_dest });
        window.history.replaceState(null, '', `/post${permalink}`)

        console.log(isOpen, 'onOpen')

        onOpen();

    };


   
    return (
        <>
        <Modal 
        size={'full'} 
        isOpen={isOpen} 
        onClose={onClose} 
        classNames={{
            body: "py-6",
            backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
            base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
            header: "border-b-[1px] border-[#292f46]",
            footer: "border-t-[1px] border-[#292f46]",
            closeButton: "hover:bg-white/5 active:bg-white/10 h-28 mr-20",
          }}
      >
        <ModalContent>
          {(onClose) => (
            <>
            <DetailPage data={selectedData} closeButton={true} onClose={onClose} isOpen={isOpen}/>
        </>
          )}
        </ModalContent>
      </Modal>

         
      <div className='postContentContainer'>
            <Masonry
                breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {
                    data?.filter((imgs) => imgs.data.post_hint === "image" || imgs.data.post_hint == 'hosted:video')?.map((Data, index) => {
                        if (Data?.data?.post_hint === "hosted:video" || Data?.data?.post_hint === "rich:video") {
                            return (
                                <div className='item' key={index}>
                                    <video  controls preload="auto" playsInline>
                                        <source src={Data?.data?.post_hint == 'rich:video' ? Data?.data.preview?.reddit_video_preview?.fallback_url : Data?.data?.media?.reddit_video.fallback_url} type="video/mp4" />
                                        </video>
                                </div>
                            )
                        } else if (Data?.data?.post_hint === "image") {
                            return (
                                //post title should be visible on hover
                                <div className='item' key={index} onClick={() => openPopup(Data?.data?.permalink, Data?.data?.title, Data?.data?.url_overridden_by_dest)}>
                                    {/* <Link href={`/post/${Data.data.permalink}`} > */}
                                        <img
                                            // src={Data.data.url_overridden_by_dest}
                                        src={(Data?.data?.preview?.images[0]?.resolutions[4] ||
                                            Data?.data?.preview?.images[0]?.resolutions[3] ||
                                            Data?.data?.preview?.images[0]?.resolutions[2] ||
                                            Data?.data?.preview?.images[0]?.resolutions[1] ||
                                            Data?.data?.preview?.images[0]?.resolutions[0])?.url?.replace(/&amp;/g, '&')}
                                        alt={Data.data.title}
                                        />
                                       <p className='posttitle'>{Data.data.title.replace(/&amp;/g, '&')}</p>
                                    {/* </Link> */}
                                </div>
                            )

                        }

                    })
                }
            </Masonry>


        </div>

      </>

    )
}

export default ImageList