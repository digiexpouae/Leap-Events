"use client";

import React, { useState } from "react";
import { motion } from 'framer-motion'
const departments = [
    "Corporate Events",
    "Family Festivals",
    "Students Festival",
    "Tech Festival",
    // "Wedding Events",
    "Other",
];

export default function GetInTouch({ className }) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        company: "",
        email: "",
        comments: "",
        department: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        console.log("Form submitted:", form);
        // hook up your API / server action here
    };
    const dismissKeyboard = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    return (
        <section
            className={`w-full py-14 sm:py-20 ${className}`}
            onTouchStart={dismissKeyboard} 
        >
            <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">

                {/* Heading */}
                <motion.h2
                    className="text-center font-black uppercase font-bold text-[clamp(2rem,6vw,3.8rem)] text-gray-900 tracking-tight mb-10 sm:mb-12"
                    initial={{ y: 30 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}


                >
                    Get In Touch
                </motion.h2>

                {/* Form grid */}
                <motion.form className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"



                    initial={{ y: 60 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-full bg-white border text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2"
                        style={{
                            border: "1.5px solid rgba(86,134,218,0.25)",
                            // @ts-ignore
                            "--tw-ring-color": "rgba(86,134,218,0.35)",
                        }}
                    />

                    {/* Phone */}
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-full bg-white border text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2"
                        style={{
                            border: "1.5px solid rgba(86,134,218,0.25)",
                            "--tw-ring-color": "rgba(86,134,218,0.35)",
                        }}
                    />

                    {/* Company */}
                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-full bg-white border text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2"
                        style={{
                            border: "1.5px solid rgba(86,134,218,0.25)",
                            "--tw-ring-color": "rgba(86,134,218,0.35)",
                        }}
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-full bg-white border text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2"
                        style={{
                            border: "1.5px solid rgba(86,134,218,0.25)",
                            "--tw-ring-color": "rgba(86,134,218,0.35)",
                        }}
                    />

                    {/* Comments */}
                    <input
                        type="text"
                        name="comments"
                        placeholder="Comments"
                        value={form.comments}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-full bg-white border text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2"
                        style={{
                            border: "1.5px solid rgba(86,134,218,0.25)",
                            "--tw-ring-color": "rgba(86,134,218,0.35)",
                        }}
                    />

                    {/* Department select */}
                    <div className="relative w-full">
                        <select
                            name="select department"
                            value={form.department}
                            onChange={handleChange}
                            className="w-full appearance-none px-5 py-3.5 rounded-full bg-white border text-sm outline-none transition-all duration-200 focus:ring-2 pr-10"
                            style={{
                                border: "1.5px solid rgba(86,134,218,0.25)",
                                "--tw-ring-color": "rgba(86,134,218,0.35)",
                                color: form.department ? "#374151" : "#9ca3af",
                            }}
                        >
                            <option value="" disabled hidden>
                                Select Department
                            </option>
                            {departments.map((d) => (
                                <option key={d} value={d} className="text-gray-700">
                                    {d}
                                </option>
                            ))}
                        </select>
                        {/* Custom chevron */}
                        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3 5L7 9L11 5"
                                    stroke="#5686DA"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Submit button — full width */}
                    <div className="sm:col-span-2 mt-1">
                        <button
                            onClick={handleSubmit}
                            className="w-full py-3 bg-primary rounded-full font-bold text-white text-sm sm:text-base tracking-tighter  transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] cursor-pointer"

                        >
                            Explore More
                        </button>
                    </div>

                </motion.form>
            </div>


        </section >
    );
}