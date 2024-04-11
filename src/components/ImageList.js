import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import Video from 'next-video';


const ImageList = ({ data }) => {

    const breakpointColumnsObj = {
        default: 3,
        1100:  3,
        700:  2,
        500: 2,
      };

   
    return (
        <>  
      <div className='postContentContainer'>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {
                    data?.filter((imgs) => imgs.data.post_hint === "image" || imgs.data.post_hint == 'hosted:video')?.map((Data, index) => {
                        if (Data?.data?.post_hint === "hosted:video" || Data?.data?.post_hint === "rich:video") {
                            return (
                                <div className='item' key={index}>
                                    <Video src={Data?.data?.post_hint == 'rich:video' ? Data?.data.preview?.reddit_video_preview?.fallback_url : Data?.data?.media?.reddit_video.fallback_url} />;
                                </div>
                            )
                        } else if (Data?.data?.post_hint === "image") {
                            return (
                                //post title should be visible on hover
                                <Link href={`/post${Data.data.permalink}`} key={index}>
                                <div className='item' key={index} >
                                    {/* <Link href={`/post/${Data.data.permalink}`} > */}
                                        <Image width={1000} height={1000}
                                             src={  Data?.data?.domain.includes('gif')? Data.data.url_overridden_by_dest :
                                        (Data?.data?.preview?.images[0]?.resolutions[4] ||
                                            Data?.data?.preview?.images[0]?.resolutions[3] ||
                                            Data?.data?.preview?.images[0]?.resolutions[2] ||
                                            Data?.data?.preview?.images[0]?.resolutions[1] ||
                                            Data?.data?.preview?.images[0]?.resolutions[0])?.url?.replace(/&amp;/g, '&')}
                                        alt={Data.data.title}
                                        />
                                       <p className='posttitle'>{Data.data.title.replace(/&amp;/g, '&')}</p>
                                    {/* </Link> */}
                                </div>
                                </Link>
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