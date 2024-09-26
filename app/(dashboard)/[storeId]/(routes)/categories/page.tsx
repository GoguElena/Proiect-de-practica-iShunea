import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";


// Define an interface for CategoryItem
interface CategoryItem {
    id: string;  // Assuming id is a string based on your Prisma schema
    name: string;
    billboard: {
        label: string;
    };
    createdAt: Date;  // Use Date type for createdAt
}

const CategoriesPage = async ({
    params
}: {
    params: {storeId: string}
}) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    
    // const formattedCategories: CategoryColumn[] = categories.map(( item ) => ({
    //     id: item.id,
    //     name: item.name,
    //     billboardLabel: item.billboard.label,
    //     createdAt: format(item.createdAt, "MMMM do, yyyy")
    // }))

    // Explicitly type the item parameter
    const formattedCategories: CategoryColumn[] = categories.map((item: CategoryItem) => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories}/>
            </div>
        </div>
    )
}

export default CategoriesPage;