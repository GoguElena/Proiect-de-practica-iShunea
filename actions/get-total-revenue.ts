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
import { Order, OrderItem, Product } from "@prisma/client";

// Define a new type that extends OrderItem to include the product
type OrderItemWithProduct = OrderItem & {
    product: Product; // Include the product relationship
};

type OrderWithItems = Order & {
    orderItems: OrderItemWithProduct[]; // Include the orderItems with product relationship
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

    return (paidOrders as OrderWithItems[]).reduce((total: number, order) => {
        const orderTotal = order.orderItems.reduce((orderSum: number, item: OrderItemWithProduct) => {
            return orderSum + item.product.price.toNumber(); // Convert Decimal to number
        }, 0);
        return total + orderTotal;
    }, 0);
};

