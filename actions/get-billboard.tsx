import { Billboard } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

    const getBillboard = async (id: string): Promise<Billboard> => {
        const res = await fetch(`${URL}/${id}`);
//----------------------------------
        // Log the full response
        console.log(await res.text());  // Log the response body

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Received non-JSON response');
        }
//-------------------------------
    return res.json();
};

export default getBillboard;



