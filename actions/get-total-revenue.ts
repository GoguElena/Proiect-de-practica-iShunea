// import prismadb from "@/lib/prismadb";
// import { Order } from "@prisma/client";
//
//
// export const getTotalRevenue=async (storeId:string)=>{
//     const paidOrders = await prismadb.order.findMany({
//         where:{
//             storeId,
//             isPaid:true,
//         },
//         include:{
//             orderItems:{
//                 include:{
//                     product:true
//                 }
//             }
//         }
//     });
//     const totalRevenue = paidOrders.reduce((total: number, order: Order) => {
//         const orderTotal = order.orderItems.reduce((orderSum: number, item) => {
//           return orderSum+item.product.price.toNumber();
//        },0)
//         return total + orderTotal;
//     },0)
//     return totalRevenue;
// }

import prismadb from "@/lib/prismadb";
import { Order, OrderItem } from "@prisma/client";


// Define a new type that extends Order to include orderItems
type OrderWithItems = Order & {
    orderItems: OrderItem[]; // Include the orderItems relationship
};

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    // Cast paidOrders to OrderWithItems[]
    return (paidOrders as OrderWithItems[]).reduce((total: number, order) => {
        const orderTotal = order.orderItems.reduce((orderSum: number, item) => {
            return orderSum + item.product.price.toNumber(); // Convert Decimal to number
        }, 0);
        return total + orderTotal;
    }, 0);
};
