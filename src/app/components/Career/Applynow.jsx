"use client";

import { useState } from "react";

const preferredRoles = [
    "Creative Strategy",
    "Experiential Design",
    "AV & Staging",
    "Marketing",
    "Operations",
    "Other",
];

export default function ApplyNowSection() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        preferredRole: "",
        currentSalary: "",
        expectedSalary: "",
        linkedin: "",
        cv: null,
    });

    const [cvName, setCvName] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleFile(e) {
        const file = e.target.files?.[0];
        if (file) {
            setForm((prev) => ({ ...prev, cv: file }));
            setCvName(file.name);
        }
    }

    function handleSubmit() {
        console.log("Form submitted:", form);
    }

    const inputClass =
        "w-full  rounded-full px-5 py-3 text-sm text-gray-700 placeholder-gray-400 border border-gray-400 focus:outline-none focus:border-[color:var(--color-heading)] transition-colors";

    const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

    return (
        <section className="w-full bg-white px-6 md:px-16 lg:px-24 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">

                {/* Heading */}
                <h2 className="text-[color:var(--color-heading)] font-black uppercase text-3xl md:text-4xl tracking-tight text-center mb-10 md:mb-12">
                    APPLY NOW
                </h2>

                {/* Form */}
                <div className="flex flex-col gap-5">

                    {/* Full name — full width */}
                    <div>
                        <label className={labelClass}>Full name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            placeholder="Full name"
                            className={inputClass}
                        />
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Country + City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>Country</label>
                            <input
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                placeholder="Enter"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>City</label>
                            <input
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="Enter"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Preferred Role — full width dropdown */}
                    <div>
                        <label className={labelClass}>Preferred Role</label>
                        <div className="relative">
                            <select
                                name="preferredRole"
                                value={form.preferredRole}
                                onChange={handleChange}
                                className="w-full rounded-full px-5 py-3 text-sm text-gray-700  border border-gray-400 focus:outline-none focus:border-[color:var(--color-heading)] transition-colors appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select</option>
                                {preferredRoles.map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                            <svg
                                className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                                viewBox="0 0 16 16" fill="none"
                            >
                                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    {/* Current Salary + Expected Salary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>Current Salary</label>
                            <input
                                type="text"
                                name="currentSalary"
                                value={form.currentSalary}
                                onChange={handleChange}
                                placeholder="Enter"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Expected Salary</label>
                            <input
                                type="text"
                                name="expectedSalary"
                                value={form.expectedSalary}
                                onChange={handleChange}
                                placeholder="Enter"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* LinkedIn + CV Upload */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>LinkedIn Profile</label>
                            <input
                                type="url"
                                name="linkedin"
                                value={form.linkedin}
                                onChange={handleChange}
                                placeholder="Enter"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>CV / Resume</label>
                            <label className="relative flex items-center  rounded-full px-5 py-3  border border-gray-400 hover:border-[color:var(--color-heading)] transition-colors cursor-pointer">
                                <span className="text-sm text-gray-400 flex-1 truncate">
                                    {cvName || "Attach"}
                                </span>
                                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 2v9M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFile}
                                    className="sr-only"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 bg-primary rounded-full font-bold text-white text-sm sm:text-base tracking-tighter  transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] cursor-pointer"
                    >
                        Submit
                    </button>

                </div>
            </div>
        </section>
    );
}