import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";
import { Size } from "@prisma/client"; // Adjust according to your project structure

// Define the type for the item if not already defined
interface Item extends Size {
    // Include any additional properties if needed
}

const SizesPage = async ({
    params
}: {
    params: {storeId: string}
}) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },

        orderBy: {
            createdAt: 'desc'
        }
    });
    
    // const formattedSizes: SizeColumn[] = sizes.map(( item ) => ({
    //     id: item.id,
    //     name: item.name,
    //     value: item.value,
    //     createdAt: format(item.createdAt, "MMMM do, yyyy")
    // }))

    // Map sizes to formattedSizes with explicit typing
    const formattedSizes: SizeColumn[] = sizes.map((item: Item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy") // Ensure createdAt is available in item
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes}/>
            </div>
        </div>
    )
}

export default SizesPage;