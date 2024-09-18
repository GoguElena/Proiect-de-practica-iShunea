// import React from 'react';
// import getProducts from '@/actions/get-products'
// import getProduct from "@/actions/get-product";
// import ProductList  from '@/components/product-list'
// import Container from '@/components/ui/container'
// import Gallery  from '@/components/gallery'
// import Info from '@/components/info'
//
//
// interface ProductPageProps {
//     params: {
//         productId: string
//     }
// }
// /////----------------------------------
// // const ProductPage: React.FC<ProductPageProps> = async ({
// // params
// // }) => {
// /////----------------------------
// const ProductPage = async ({ params }: ProductPageProps) => {
//     const product = await getProduct(params.productId);
//     const suggestedProducts = await getProducts({
//         categoryId: product?.category?.id,
//     })
//     return (
//         <div className="bg-white">
//             <Container>
//                 <div className="px-4 py-10 sm:px-6 lg:px-8">
//                     <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
//                         <Gallery images={product.images} />
//                         <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
//                             <Info data={product} />
//                         </div>
//                     </div>
//                     <hr className="my-10" />
//                     <ProductList title="Related Items" items={suggestedProducts} />
//                 </div>
//             </Container>
//         </div>
//     );
// };
//
// export default ProductPage;

import React from 'react';
import getProducts from '@/actions/get-products';
import getProduct from "@/actions/get-product";
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import Gallery from '@/components/gallery';
import Info from '@/components/info';

interface ProductPageProps {
    params: {
        productId: string;
    };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
    // Fetch the product details
    const product = await getProduct(params.productId);

    // If no product found, return a simple message
    if (!product) {
        return <div>Product not found</div>;
    }

    // Fetch related products based on category
    const suggestedProducts = await getProducts({
        categoryId: product?.category?.id,
    });

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {product?.images?.length ? (
                            <Gallery images={product.images} />
                        ) : (
                            <div>No images available</div>
                        )}
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <Info data={product} />
                        </div>
                    </div>
                    <hr className="my-10" />
                    {suggestedProducts?.length ? (
                        <ProductList title="Related Items" items={suggestedProducts} />
                    ) : (
                        <div>No related products found</div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default ProductPage;
