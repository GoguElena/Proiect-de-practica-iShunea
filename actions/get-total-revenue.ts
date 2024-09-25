import prismadb from "@/lib/prismadb";
import { Order } from "@prisma/client";


export const getTotalRevenue=async (storeId:string)=>{
    const paidOrders = await prismadb.order.findMany({
        where:{
            storeId,
            isPaid:true,
        },
        include:{
            orderItems:{
                include:{
                    product:true
                }
            }
        }
    });
// Calculate the total revenue
    const totalRevenue = paidOrders.reduce((total: number, order: Order | null) => {
        // Ensure order exists before accessing its properties
        if (order) {
            const orderTotal = order.orderItems?.reduce((orderSum: number, item) => {
                // Ensure item.product exists and has a price
                if (item.product && item.product.price) {
                    return orderSum + item.product.price.toNumber(); // Convert price to a number
                }
                return orderSum; // Return current sum if price is not available
            }, 0) || 0; // Default to 0 if orderItems is undefined or empty

            return total + orderTotal; // Add order total to the total revenue
        }
        // Return current total if order is not present
        return total;
    }, 0);

    return totalRevenue;
    // const totalRevenue = paidOrders.reduce((total: number, order: Order) => {
    //     const orderTotal = order.orderItems.reduce((orderSum: number, item) => {
    //       return orderSum+item.product.price.toNumber();
    //    },0)
    //     return total + orderTotal;
    // },0)
    // return totalRevenue;
}
