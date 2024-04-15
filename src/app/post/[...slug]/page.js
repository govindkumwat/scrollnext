import axios from 'axios';
import Image from 'next/image';

export const generateMetadata = async ({ params }) => {
  try {
    const res = await axios(`https://api.reddit.com/${params?.slug}.json`);
    return {
      title: res.data[0]?.data?.children[0]?.data?.title,
      description: `Scrollway ${res.data[0]?.data?.children[0]?.data?.title}`,
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    throw error; // Re-throw for handling in page function
  }
};

async function getSingle(params) {
  try {
    const res = await axios(`https://api.reddit.com/${params?.slug}.json`);
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

const page = async ({ params }) => {
  try {
    const data = await getSingle(params);
    const [postDetail] = await Promise.all([data]);

    return (
      <>
        {postDetail[0]?.data?.children[0]?.data && ( // Conditionally render content
          <div className='detailImage'>
            <Image
              width={1000}
              height={1000}
              src={postDetail[0]?.data?.children[0]?.data?.url_overridden_by_dest}
              alt={data?.title}
            />
            <div className='detailText'>{postDetail[0]?.data?.children[0]?.data?.title}</div>
            <div className='detailCross'>
              <svg {...}>{/* ... your SVG code ... */}</svg>
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('Error rendering page:', error);
    // Handle error gracefully in production (e.g., display fallback content)
    return <div>Error fetching data. Please try again later.</div>;
  }
};

export default page;