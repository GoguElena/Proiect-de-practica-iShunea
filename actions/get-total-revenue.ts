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
    // Verificăm dacă `orderItems` există pe `order` înainte de a accesa proprietățile sale
    const totalRevenue = paidOrders.reduce((total: number, order: Order) => {
        if (order.orderItems && order.orderItems.length > 0) {
            const orderTotal = order.orderItems.reduce((orderSum: number, item) => {
                return orderSum + item.product.price.toNumber();
            }, 0);
            return total + orderTotal;
        }
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
