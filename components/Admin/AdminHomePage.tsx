'use client'

import { Card, LineChart, EventProps } from '@tremor/react';
import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartdata = [
  {
    date: 'Jan 23',
    2022: 45,
    2023: 78,
  },
  {
    date: 'Feb 23',
    2022: 52,
    2023: 71,
  },
  {
    date: 'Mar 23',
    2022: 48,
    2023: 80,
  },
  {
    date: 'Apr 23',
    2022: 61,
    2023: 65,
  },
  {
    date: 'May 23',
    2022: 55,
    2023: 58,
  },
  {
    date: 'Jun 23',
    2022: 67,
    2023: 62,
  },
  {
    date: 'Jul 23',
    2022: 60,
    2023: 54,
  },
  {
    date: 'Aug 23',
    2022: 72,
    2023: 49,
  },
  {
    date: 'Sep 23',
    2022: 65,
    2023: 52,
  },
  {
    date: 'Oct 23',
    2022: 68,
    2023: null,
  },
  {
    date: 'Nov 23',
    2022: 74,
    2023: null,
  },
  {
    date: 'Dec 23',
    2022: 71,
    2023: null,
  },
]

export default function AdminHomePage() 
{
    const [value, setValue] = useState<EventProps>(null);

    return (
        <section className='flex w-full flex-col overflow-auto gap-8 px-8 py-8 text-[#003B33]'>
            <div className='flex flex-col bg-[#fff] px-12 rounded-3xl border-[rgba(0,59,51,0.5)] gap-12 py-8 mx-auto border-8 w-screen max-w-[1080px]'>

                <div className='flex gap-6'>
                    <div className="mx-auto max-w-md rounded-xl shadow-lg flex-1 py-4 px-4">
                        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            Total Donations
                        </h4>
                        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            1,024
                        </p>
                    </div>
                    <div className="mx-auto max-w-md rounded-xl shadow-lg flex-1 py-4 px-4">
                        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            Active Donors
                        </h4>
                        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            72
                        </p>
                    </div>
                    <div className="mx-auto max-w-md rounded-xl shadow-lg flex-1 py-4 px-4">
                        <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                            Total Organizations
                        </h4>
                        <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            16
                        </p>
                    </div>
                </div>
                <div className='flex flex-col my-12 mx-auto gap-4 w-full'>
                    <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Active Donors</h3>
                    <BarChart
                        series={[
                            { data: [35, 44, 24, 34] },
                            { data: [51, 6, 49, 30] },
                            { data: [15, 25, 30, 50] },
                            { data: [60, 50, 15, 25] },
                        ]}
                        height={290}
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    />
                </div>
            </div>
        </section>
    )
}