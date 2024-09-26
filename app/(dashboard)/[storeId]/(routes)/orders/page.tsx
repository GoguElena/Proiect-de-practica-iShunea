import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import {OrderClient} from "./components/client";
import {OrderColumn} from "./components/columns";
import {formatter} from "@/lib/utils";
//..
import { Order, OrderItem, Product } from "@prisma/client";

//...
type OrderWithItems = Order & {
    orderItems: (OrderItem & {
        product: Product;
    })[];
};



const OrdersPage = async ({
    params
}: {
    params: {storeId: string}
}) => {
    // const orders = await prismadb.order.findMany({
    const orders: OrderWithItems[] = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include:{
                    product:true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id, // Must match Order's id
        phone: item.phone, // Must match Order's phone
        address: item.address, // Must match Order's address
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, orderItem) => {
            return total + Number(orderItem.product.price);
        }, 0)),
        isPaid: item.isPaid, // Must match Order's isPaid
        createdAt: format(item.createdAt, "MMMM do, yyyy") // Must match Order's createdAt
    }));



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders}/>
            </div>
        </div>
    )
}

export default OrdersPage;