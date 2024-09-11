import React from "react";
import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: { storeId: string }
}

// Server Component
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
    const { storeId } = params;

    const store = await prismadb.store.findFirst({
        where: { id: storeId }
    });


    return (
        <div>
        Active Store:{store?.name}
        </div>
    );
};

export default DashboardPage;
