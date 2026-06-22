"use client";

import { useState } from "react";

const departments = [
  "Corporate Events",
  "Family Festivals",
  "Students Festival",
  "Tech Festival",
  "Other",
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    department: "",
    comments: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email) {
      setErrorMsg("Email is required.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          message: [
            form.company ? `Company: ${form.company}` : "",
            form.department ? `Department: ${form.department}` : "",
            form.comments ? `Comments: ${form.comments}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setForm({
        name: "",
        phone: "",
        company: "",
        email: "",
        department: "",
        comments: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to send. Please try again.");
    }
  };

  const inputBase =
    "w-full rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

  return (
    <section className="relative w-full overflow-hidden bg-white py-34">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold uppercase leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Have a project
              <br />
              in mind?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-black">
              Your vision deserves a partner who listens, understands, and
              brings your ideas to life. Together, we create impactful
              experiences through bold ideas and flawless execution.
            </p>
          </div>

          <div className="relative">
            {status === "success" && (
              <p className="mb-4 text-center font-medium text-green-600">
                ✅ Your message was sent successfully!
              </p>
            )}

            {status === "error" && (
              <p className="mb-4 text-center font-medium text-red-500">
                ⚠️ {errorMsg}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className={inputBase}
              />

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={inputBase}
                dir="auto"
              />

              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
                className={inputBase}
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={inputBase}
              />

              <div className="relative">
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className={`${inputBase} appearance-none pr-12 ${
                    form.department === "" ? "text-slate-400" : "text-slate-700"
                  }`}
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <svg
                  className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <input
                type="text"
                name="comments"
                value={form.comments}
                onChange={handleChange}
                placeholder="Comments"
                className={inputBase}
              />

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-full bg-[var(--color-primary)] px-10 py-3 text-sm font-semibold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}