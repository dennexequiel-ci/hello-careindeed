'use client';

import { BuildingOffice2Icon, PhoneIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import useInquiryResultStore from '../useInquiryResultStore';

export default function Results() {
  const router = useRouter();

  const inquiryResult = useInquiryResultStore((state) => state.inquiryResult);

  // If there is no inquiry result, redirect to the home page
  if (!inquiryResult) {
    router.push('/');
  }

  return (
    <div className='relative isolate bg-neutral-100 px-6 py-24 sm:py-32 lg:px-8 min-h-screen'>
      <svg
        className='absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
        aria-hidden='true'
      >
        <defs>
          <pattern
            id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
            width={200}
            height={200}
            x='50%'
            y={-64}
            patternUnits='userSpaceOnUse'
          >
            <path d='M100 200V.5M.5 .5H200' fill='none' />
          </pattern>
        </defs>
        <svg x='50%' y={-64} className='overflow-visible fill-gray-50'>
          <path
            d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z'
            strokeWidth={0}
          />
        </svg>
        <rect
          width='100%'
          height='100%'
          strokeWidth={0}
          fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)'
        />
      </svg>
      <div className='mx-auto max-w-2xl sm:text-center mt-0 sm:mt-40'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Hey {inquiryResult?.fullName}!
        </h2>
        <p className='mt-2 text-lg leading-8 text-gray-600'>
          {inquiryResult?.nearestBranchInfo}
        </p>
      </div>
      <div className='mx-auto mt-10 max-w-lg space-y-16'>
        <div className='flex gap-x-6'>
          <div>
            <h3 className='text-2xl font-bold leading-7 text-gray-900'>
              {inquiryResult?.branchDetails.name}
            </h3>
            <dl className="mt-5 space-y-4 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a
                    target='_blank'
                    href={inquiryResult?.branchDetails.googleMapsUrl}
                    className='text-sm font-semibold leading-6 text-gray-600 hover:underline'
                  >
                    {inquiryResult?.branchDetails.address}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a
                    href={`tel:${inquiryResult?.branchDetails.landline}`}
                    className='text-sm font-semibold leading-6 text-gray-600 hover:underline'
                  >
                    {inquiryResult?.branchDetails.landline}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <a
                  target='_blank'
                  href={inquiryResult?.branchDetails.landingPageUrl}
                  className='text-sm font-semibold leading-6 text-indigo-600'
                >
                  Learn More <span aria-hidden='true'>&rarr;</span>
                </a>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
