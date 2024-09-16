import { Category } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

    const getCategories = async (): Promise<Category[]> => {
        const res = await fetch(URL);

        //-------------------------------------

        // Log the full response
        console.log(await res.text());  // Log the response body

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Received non-JSON response');
        }
        // -------------------------------

    return res.json();
};

export default getCategories;



