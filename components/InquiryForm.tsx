"use client";

import { inquiryFormSchema } from '@/schemas/inquiryFormSchema';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const InquiryForm = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        zipCode: '',
        staffingTypes: [] as string[]
    });
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value.trim()
        }));

        // Remove error for the field being typed into
        if (errors[name]) {
            setErrors(prev => {
                const updatedErrors = { ...prev };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            staffingTypes: checked
                ? [...prev.staffingTypes, value]
                : prev.staffingTypes.filter(type => type !== value)
        }));

        // Remove error for staffingTypes when a checkbox is changed
        if (errors['staffingTypes']) {
            setErrors(prev => {
                const updatedErrors = { ...prev };
                delete updatedErrors['staffingTypes'];
                return updatedErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationResult = inquiryFormSchema.safeParse({
            ...formData
        })

        if (!validationResult.success) {
            console.log(validationResult.error.flatten().fieldErrors);
            setErrors(validationResult.error.flatten().fieldErrors);
            return;
        }
    };

    return (
        <div className="relative isolate bg-neutral-100">
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2">
                <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                    <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                        <svg
                            className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                            aria-hidden="true"
                        >
                            <defs>
                                <pattern
                                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                                    width={200}
                                    height={200}
                                    x="50%"
                                    y={-64}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <path d="M100 200V.5M.5 .5H200" fill="none" />
                                </pattern>
                            </defs>
                            <svg x="50%" y={-64} className="overflow-visible fill-gray-50">
                                <path
                                    d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
                                    strokeWidth={0}
                                />
                            </svg>
                            <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
                        </svg>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Interested in more details?</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            We are here to help you with any questions or concerns you may have. Fill out the form below and we will get back to you as soon as possible.
                        </p>
                        <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Address</span>
                                    <BuildingOffice2Icon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    419 E. Hamilton Avenue Campbell
                                    <br />
                                    CA 95008
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Telephone</span>
                                    <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900" href="tel:(844) 226-9517">
                                        (844) 226-9517
                                    </a>
                                </dd>
                            </div>
                            <div className="flex gap-x-4">
                                <dt className="flex-none">
                                    <span className="sr-only">Email</span>
                                    <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                </dt>
                                <dd>
                                    <a className="hover:text-gray-900" href="mailto:info@careindeed.com">
                                        info@careindeed.com
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
                    <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900">
                                    First Name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.firstName ? 'ring ring-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-500">{errors.firstName[0]}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.lastName ? 'ring ring-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-500">{errors.lastName[0]}</p>
                                    )}
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.email ? 'ring ring-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
                                    )}
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="zipCode" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Zip Code
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        id="zipCode"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.zipCode ? 'ring ring-red-500 focus:ring-red-500' : ''}`}
                                    />
                                    {errors.zipCode && (
                                        <p className="mt-1 text-sm text-red-500">{errors.zipCode[0]}</p>
                                    )}
                                </div>
                            </div>
                            <fieldset className="sm:col-span-2">
                                <legend className="block text-sm font-semibold leading-6 text-gray-900">Staffing Types</legend>
                                <div className="mt-2 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="assistedLiving"
                                            name="assistedLiving"
                                            value="Assisted Living"
                                            checked={formData.staffingTypes.includes('Assisted Living')}
                                            onChange={handleCheckboxChange}
                                            className="focus:ring-indigo-600 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                        <label htmlFor="assistedLiving" className="ml-3 block text-sm font-medium text-gray-700">
                                            Assisted Living
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="homeCare"
                                            name="homeCare"
                                            value="Home Care"
                                            checked={formData.staffingTypes.includes('Home Care')}
                                            onChange={handleCheckboxChange}
                                            className="focus:ring-indigo-600 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                        <label htmlFor="homeCare" className="ml-3 block text-sm font-medium text-gray-700">
                                            Home Care
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="homeHealth"
                                            name="homeHealth"
                                            value="Home Health"
                                            checked={formData.staffingTypes.includes('Home Health')}
                                            onChange={handleCheckboxChange}
                                            className="focus:ring-indigo-600 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                        <label htmlFor="homeHealth" className="ml-3 block text-sm font-medium text-gray-700">
                                            Home Health
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="independentLiving"
                                            name="independentLiving"
                                            value="Independent Living/Retirement Community"
                                            checked={formData.staffingTypes.includes('Independent Living/Retirement Community')}
                                            onChange={handleCheckboxChange}
                                            className="focus:ring-indigo-600 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                        <label htmlFor="independentLiving" className="ml-3 block text-sm font-medium text-gray-700">
                                            Independent Living/Retirement Community
                                        </label>
                                    </div>
                                </div>
                                {errors.staffingTypes && (
                                    <p className="mt-2 text-sm text-red-500">{errors.staffingTypes[0]}</p>
                                )}
                            </fieldset>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InquiryForm;