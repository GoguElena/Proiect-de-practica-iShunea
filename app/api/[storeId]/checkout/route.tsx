import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

// Define the ProductType interface
interface ProductType {
    id: string; // or appropriate type
    name: string;
    price: {
        toNumber: () => number; // Method to convert price to number
    };
}

// const corsHeaders = {
//     "Access-Control-Allow-Origin": process.env.FRONTEND_STORE_URL || "http://localhost:3001",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };
const corsHeaders: HeadersInit = {
    "Access-Control-Allow-Origin": "http://localhost:3001", // permite cereri doar din frontend-ul de pe portul 3001
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


// export async function OPTIONS() {
//     return NextResponse.json({}, { headers: corsHeaders });
// };
export async function OPTIONS() {
    return new Response(null, { headers: corsHeaders });
}



export async function POST(req: Request, { params }: {params: {storeId: string}}) {
    const headers = { ...corsHeaders, "Content-Type": "application/json" };
    const { productIds } = await req.json();

    if(!productIds || productIds.length === 0) {
        return new NextResponse("Product ids are required", {status: 400});
    }

    // Fetch products from the database
    const products = await prismadb.product.findMany({
        where: {
            id: { in: productIds }
        }
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    // products.forEach((product) => {
    products.forEach((product: ProductType) => { // Specify the product type here
        line_items.push({
            quantity: 1,
            price_data: {
                currency: "USD",
                product_data: {name: product.name,},
                unit_amount: product.price.toNumber() * 100
            }
        });
    });



    const order = await prismadb.order.create({
        data: {
            storeId: params.storeId,
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        }
    });


    // const session = await stripe.checkout.sessions.create({
    //     line_items,
    //     mode: "payment",
    //     billing_address_collection: "required",
    //     phone_number_collection: {enabled: true},
    //     success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    //     cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    //     metadata: {orderId: order.id}
    // });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // Add this line
            line_items,
            mode: "payment",
            billing_address_collection: "required",
            phone_number_collection: { enabled: true },
            success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
            cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
            metadata: { orderId: order.id }
        });


    // return NextResponse.json({url:session.url},{
    //     headers: corsHeaders
    // });
        return new Response(JSON.stringify({ url: session.url }), { headers });
    } catch (error) {
        console.error("Stripe error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


