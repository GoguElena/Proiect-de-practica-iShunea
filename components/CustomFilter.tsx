"use client";
import { Fragment, useState } from "react";
import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import { CustomFilterProps } from "@/types";

export default function CustomFilter({ title, options, setFilter }: CustomFilterProps) {
    const [selected, setSelected] = useState<string | number>(options[0].value); // Store selected value (string or number)

    // Handler function for value changes
    const handleChange = (value: string | number) => {
        if (value !== selected) { // Ensure the value has actually changed
            setSelected(value); // Update the selected value
            setFilter(value); // Update the filter with the new value
        }
    };

    return (
        <div className="w-fit">
            <Listbox
                value={selected}
                onChange={handleChange} // Use the handler function
            >
                <div className="relative w-fit z-10">
                    <Listbox.Button className="custom-filter__btn">
                        <span className="block truncate">
                            {options.find(option => option.value === selected)?.title ?? "Select option"}
                        </span>
                        <Image
                            src="/chevron-up-down.svg"
                            width={20}
                            height={20}
                            className="ml-4 object-contain"
                            alt="chevron_up-down"
                        />
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="custom-filter__options">
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.value}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 px-4 ${active ? "bg-primary-blue text-white" : "text-gray-900"}`
                                    }
                                    value={option.value} // Value should be string or number
                                >
                                    {({ selected }) => (
                                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                            {option.title}
                                        </span>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

