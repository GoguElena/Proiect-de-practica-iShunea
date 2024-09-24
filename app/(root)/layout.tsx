import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in"); // Corrected URL
    }


        // Fetch the store associated with the userId
        const store = await prismadb.store.findFirst({
            where: {
                userId,
            },
        });

        if (store) {
            // Redirect to the store page if it exists
            redirect(`/${store.id}`);
        }

        // If no store exists, render the children
        return <>{children}</>;

}
