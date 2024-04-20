import DetailPage from '@/components/DetailPage';
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


const page = async () => {
  
    return (
      <>
       <DetailPage/>
      </>
    );
};

export default page;