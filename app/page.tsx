"use client";
import { useEffect, useState } from "react";
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import Image from "next/image";
import { CarProps } from "@/types";

type CarResult = CarProps[] | { message: string };

export default function Home() {
    const [allCars, setAllCars] = useState<CarResult>([]);
    const [loading, setLoading] = useState(false);

    // Search states
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");

    // Filter states
    const [fuel, setFuel] = useState("");
    const [year, setYear] = useState(2022);

    // Pagination state
    const [limit, setLimit] = useState(10);

    const getCars = async () => {
        setLoading(true);

        try {
            const result = await fetchCars({
                manufacturer: manufacturer || "",
                year: year || 2022,
                fuel: fuel || "",
                limit: limit || 10,
                model: model || "",
            });

            // Verifică dacă result conține un mesaj de eroare
            if ('message' in result) {
                setAllCars(result); // În acest caz, result este un obiect cu mesaj
            } else {
                setAllCars(result); // În acest caz, result este un array de mașini
            }
        } catch (error) {
            setAllCars({ message: "An error occurred while fetching cars." });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCars();
    }, [fuel, year, limit, manufacturer, model]);

    const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;

    return (
        <main className="overflow-hidden">
            <Hero />

            <div className="mt-12 padding-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
                    <p>Explore the cars you might like </p>
                </div>
                <div className="home__filters">
                    <SearchBar setManufacturer={setManufacturer} setModel={setModel}/>
                    <div className="home__filter-container">
                        <CustomFilter title="fuel" options={fuels} setFilter={(value: string) => setFuel(value)}/>
                        <CustomFilter title="year" options={yearsOfProduction}
                                      setFilter={(value: number) => setYear(Number(value))}/>
                    </div>
                </div>

                {Array.isArray(allCars) && allCars.length > 0 ? (
                    <section>
                        <div className='home__cars-wrapper'>
                            {allCars.map((car) => (
                                <CarCard key={car.id} car={car}/> // Add a unique key if needed
                            ))}
                        </div>

                        {loading && (
                            <div className="mt-16 w-full flex-center">
                                <Image
                                    src="/loader.svg"
                                    alt="loader"
                                    width={50}
                                    height={50}
                                    className="object-contain"
                                />
                            </div>
                        )}

                        <ShowMore
                            pageNumber={limit / 10}
                            isNext={limit > allCars.length}
                            setLimit={setLimit}
                        />
                    </section>
                ) : (
                    <div className="home__error-container">
                        <h2 className="text-black text-xl font-bold">Oops, no results</h2>
                        <p>{!Array.isArray(allCars) && (allCars as { message: string }).message}</p>
                    </div>
                )}
            </div>
        </main>
    );
}