import axios from 'axios';
import Image from 'next/image';

// export const generateMetadata = async ({ params }) => {
//   try {
//     const res = await axios(`https://api.reddit.com/${params?.slug}.json`);
//     return {
//       title: res.data[0]?.data?.children[0]?.data?.title,
//       description: `Scrollway ${res.data[0]?.data?.children[0]?.data?.title}`,
//     };
//   } catch (error) {
//     console.error('Error fetching metadata:', error);
//     throw error; // Re-throw for handling in page function
//   }
// };

async function getSingle(params) {
  try {
    const res = await axios(`https://api.reddit.com/${'1c5ouvi'}.json`, {cache: 'no-store'});
    // Check if data exists before returning
    if (!res.data || !res.data[0] || !res.data[0].data || !res.data[0].data.children) {
      throw new Error('Empty data response from Reddit API');
    }
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw for handling in page function
  }
}

const page = async () => {
  try {
    const data = await getSingle();
    const [postDetail] = await Promise.all([data]);

    return (
      <>
        {/* {postDetail[0]?.data?.children[0]?.data && ( // Conditionally render content
          <div className='detailImage'>
          <Image width={1000} height={1000} src={data[0]?.data?.children[0]?.data?.url_overridden_by_dest} alt={data?.title} />
          <div className='detailText'>{data[0]?.data?.children[0]?.data?.title}</div>
          <div className='detailCross' >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
            </svg>
          </div>
        </div>
        )} */}
      </>
    );
  } catch (error) {
    console.error('Error rendering page:', error);
    // Handle error grace fully in production (e.g., display fallback content)
    return <div>Error fetching data. Please try again later.</div>;
  }
};

export default page;