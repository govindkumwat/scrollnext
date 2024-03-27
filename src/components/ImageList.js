import React from 'react'
import Masonry from 'react-masonry-css'
import ReactPlayer from 'react-player'

const ImageList = ({data}) => {
  return (
    <div className='postContentContainer'>
            <Masonry
                breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {
                    data?.filter((imgs) => imgs.data.post_hint === "image" || imgs.data.post_hint == 'hosted:video')?.map((Data, index) => {

                        

                        if(Data?.data?.post_hint === "hosted:video") {
                            return (
                              
                                 <div className='item' key={index}>
                               
                               <ReactPlayer
                                  className='vertical-view__media'
                                  url={Data?.data?.media?.reddit_video.fallback_url}
                                  width='100%'
                                  style={{ marginLeft: '10px' }}
                                  controls={true}
                                  playing={false}
                                  volume={1}
                                  onReady={() => console.log('Video is ready')}
                                />
                                </div>
                            )
                        } else if(Data?.data?.post_hint === "image") {
                            return(
                                <div className='item' key={index}>
                                <img
                                src={(Data?.data?.preview?.images[0]?.resolutions[4] ||
                                    Data?.data?.preview?.images[0]?.resolutions[3] ||
                                    Data?.data?.preview?.images[0]?.resolutions[2] ||
                                    Data?.data?.preview?.images[0]?.resolutions[1] ||
                                    Data?.data?.preview?.images[0]?.resolutions[0])?.url?.replace(/&amp;/g, '&')}
                                alt={Data.data.title}
                            />
                            </div>
                            )

                        }

                    })
                }
            </Masonry>


        </div>

  )
}

export default ImageList