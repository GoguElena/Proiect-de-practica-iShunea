import { Product } from '@/types'
import qs from 'query-string'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

interface Query {
    categoryId?: string
    colorId?: string
    sizeId?: string
    isFeatured?: boolean
}
    const getProducts = async (query:Query): Promise<Product[]> => {
        const url = qs.stringifyUrl({
            url: URL,
            query: {
                categoryId: query.categoryId,
                colorId: query.colorId,
                sizeId: query.sizeId,
                isFeatured: query.isFeatured,
            },
        })
        // const res = await fetch(URL);
        const res = await fetch(url); // folosești URL-ul generat prin query-string, nu variabila URL simplă.

//-----------------------------------------------------

        // Log the full response
        console.log(await res.text());  // Log the response body

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Received non-JSON response');
        }

//----------------------------------------------------------

        return res.json();
};

export default getProducts;



