"use client";

import { useState } from "react";
import Image from "next/image";
import { validateStep, SERVICE_STYLES_BY_REQUIREMENT, DIMENSION_FIELDS, withMeters } from "./briefSchema";

const SUBMIT_URL = "/api/Event-form";
const VALIDATED_STEPS = [2, 3, 4, 5, 6, 7, 8, 9];

const FieldError = ({ message, className = "text-red-600" }) =>
  message ? <p className={`mt-1.5 text-sm ${className}`}>{message}</p> : null;

export default function EventBriefForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 10;

  // Form State
  const [formData, setFormData] = useState({
    clientName: "",
    eventName: "",
    eventDate: "",
    dateStatus: "Date confirmed",
    formats: [],
    duration: "1 day",
    audience: [],
    attendance: "30-100",
    emirate: "Dubai",
    locationType: "Public",
    venueDetails: "",
    length: "",
    width: "",
    heightAvailable: "",
    heightRestriction: "",
    sizeGuide: "",
    siteNotes: "",
    fbRequirement: "Light refreshments",
    serviceStyles: [],
    fbNotes: "",
    entertainment: [],
    entertainmentNotes: "",
    creativeDescription: "",
    priorities: [],
    notes: "",
    name: "",
    email: "",
    phone: "",
  });
  // Errors appear after the first Continue on a step, then update live as fields are fixed
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const errors = showErrors ? validateStep(step, formData) : {};
    const [selectedEventType, setSelectedEventType] = useState('Outdoor/open');


  const handleCheckboxToggle = (field, value) => {
    setFormData((prev) => {
      const list = prev[field];
      if (list.includes(value)) {
        return { ...prev, [field]: list.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...list, value] };
      }
    });
  };

  const nextStep = () => {
    if (Object.keys(validateStep(step, formData)).length) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (step < totalSteps) setStep(step + 1);
  };

  // const prevStep = () => {
  //   setShowErrors(false);
  //   if (step > 1) setStep(step - 1);
  // };

  const handleSubmit = async () => {
    // Re-check every step; jump to the first one that still has errors
    const invalidStep = VALIDATED_STEPS.find((s) => Object.keys(validateStep(s, formData)).length);
    if (invalidStep) {
      setStep(invalidStep);
      setShowErrors(true);
      return;
    }

    setShowErrors(false);
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send dimensions with their unit, e.g. "20" → "20 m"
        body: JSON.stringify({
          ...formData,
          ...Object.fromEntries(DIMENSION_FIELDS.map((key) => [key, withMeters(formData[key])])),
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStep(10);
    } catch {
      setSubmitError("Something went wrong while sending your brief. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Step 6: keep only service styles that are relevant to the chosen requirement
  const selectFbRequirement = (requirement) => {
    const allowed = SERVICE_STYLES_BY_REQUIREMENT[requirement] || [];
    setFormData((prev) => ({
      ...prev,
      fbRequirement: requirement,
      serviceStyles: prev.serviceStyles.filter((s) => allowed.includes(s)),
    }));
  };


   const eventTypes = [
    { id: 'outdoor', label: 'outdoor/open' },
    { id: 'indoor', label: 'Indoor/enclosed' },
  { id: 'roadshow', label: 'Roadshow' },  
  ];

  return (
    // data-lenis-prevent: let the browser scroll the form natively, so Lenis smooth-scroll doesn't fight the mobile keyboard
    <main data-lenis-prevent className="min-h-screen relative bg-white text-black flex flex-col font-sans overflow-hidden ">
      {/* Form Body Container */}
      <div className="h-full w-full flex-1 flex flex-col overflow-hidden">
        {/* STEP 1: Welcome / Intro */}
  {step === 1 ? (
            <div className="relative flex-1 bg-white overflow-y-auto lg:overflow-hidden grid grid-cols-1   lg:grid-cols-12 items-stretch h-full w-full">

              {/* Background decorative diagonal split for desktop */}

                <div
                  className="absolute inset-0 bg-cover bg-center hidden lg:block"
                  style={{ backgroundImage: `url(/assets/event-form/al-zahia-desktop.webp)` }}
                ></div>

              {/* Mobile / tablet: photo corner + blue accents (mirrors desktop) */}
              <div className="pointer-events-none absolute top-0 right-0 h-40 sm:h-56 w-[62%] z-0 lg:hidden" aria-hidden="true">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(/assets/event-form/al-zahia-mob.webp)`,
                    clipPath: "polygon(38% 0, 100% 0, 100% 100%)",
                  }}
                ></div>
                <div
                  className="absolute inset-0 bg-[#5686DA]"
                  style={{ clipPath: "polygon(18% 0, 38% 0, 100% 100%, 100% 100%)" }}
                ></div>
              </div>
              <div
                className="pointer-events-none absolute bottom-0 right-0 h-28 w-32 bg-[#5686DA] z-0 lg:hidden"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                aria-hidden="true"
              ></div>
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-12 w-14 bg-[#5686DA] z-0 lg:hidden"
                style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
                aria-hidden="true"
              ></div>

              {/* Faceted triangle accents */}


              {}
              <div className="relative lg:col-span-7 px-6 pt-36 pb-4 sm:px-12 sm:pt-52 sm:pb-8 lg:p-12 h-full  flex flex-col  justify-center space-y-6"
           >

  <div
                className="pointer-events-none absolute  bg-primary h-[45%] w-[350px]  right-10 top-0 hidden lg:block z-[0]"
                style={{clipPath:"polygon(0 0, 100% 100%, 84% 0)"}}
                                  // style={{ backgroundImage: `url(/assets/event-form/shape.svg)` }}


              >

              </div>
                <div
                className="pointer-events-none absolute  bg-primary h-[65%] w-[550px] hidden !my-0 -right-30 bottom-0 lg:block z-[0]"
                style={{clipPath:"polygon(53% 51%, 0% 100%, 100% 100%)"}}
                                  // style={{ backgroundImage: `url(/assets/event-form/shape.svg)` }}


              >

              </div>
               

 <div className="absolute inset-0 !my-0 bg-white z-[2] hidden lg:block"  style={{
                  clipPath: "polygon(70% 0, 100% 45%, 84% 84%, 61% 100%, 0 100%, 0% 60%, 0 0)",
            }
              }></div>

<div  className="relative z-20 flex flex-col items-center md:items-start gap-4  lg:gap-5">

                <div className="flex items-center gap-3">

                  <span className="text-xs uppercase tracking-widest  font-bold">
                    Your event starts here
                  </span>
                   <span className="h-0.5 w-32 bg-[#5686DA]"></span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light tracking-tighter text-neutral-900 leading-tighter">
                    <span className="font-bold">Tell us what</span> <br />
                  <span className="font-semibold text-[#5686DA]">you are planning.</span>
                </h1>

                <p className="text-base text-neutral-600 max-w-md leading-relaxed">
                  A quick, choice-led brief that takes approximately 3 minutes. Select what fits — we will shape the rest.
                </p>

                <div>
                  <button
          onClick={nextStep}
                 className="bg-[#5686DA] text-white px-8 py-4 rounded-full text-sm font-semibold flex items-center gap-3 shadow-lg shadow-[#5686DA]/30 hover:bg-[#4874c2] active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <span>START THE BRIEF</span>
                    <Image src="/assets/event-form/Arrow%20Icon.svg" alt="" width={18} height={13} />
                  </button>
                </div>

                <div className="text-base font-light text-zinc-800 flex flex-wrap items-center gap-2">
                  <span>7 simple steps</span>
                  <span>|</span>
                  <span>Mostly multiple choice</span>
                  <span>|</span>
                  <span>Save anytime</span>
                </div>
</div>



              </div>

              {}
              <div className="lg:col-span-4 p-6 sm:p-10 lg:p-12 z-10 bg-transparent flex justify-center items-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-100 p-6 sm:p-8 transition-all hover:shadow-2xl"
                
                >
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">
                    What kind of event?
                  </h3>

                  <div className="space-y-3.5">
                    {eventTypes.map((type) => {
                      const isSelected = selectedEventType === type.label;
                      return (
                        <div
                          key={type.id}
                          onClick={() => setSelectedEventType(type.label)}
                          className={`group flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'border-[#5686DA] bg-[#5686DA]/5 shadow-sm'
                              : 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/50'
                          }`}
                        >
                          <span className={`text-sm font-medium ${isSelected ? 'text-[#2f4f8a] font-semibold' : 'text-neutral-700'}`}>
                            {type.label}
                          </span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected ? 'border-[#5686DA] bg-[#5686DA] text-white' : 'border-neutral-300 group-hover:border-neutral-400'
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span>Selected: <strong className="text-[#5686DA]">{selectedEventType}</strong></span>
                    <span className="text-[#5686DA] font-medium">Step 1 of 7</span>
                  </div>
                </div>
              </div>

            </div>
          ) :<></>}
                 

        {/* STEP 2: Event Essentials */}
        {step === 2 && (
          <div className="relative h-full w-full flex-1 flex flex-col justify-center overflow-hidden px-6 pt-32 pb-10 sm:pt-44 md:px-12 lg:py-24">
            {/* Background photo */}
            <div
              className="pointer-events-none absolute inset-0 z-0 translate-x-1/6 bg-cover bg-center hidden lg:block"
              style={{ backgroundImage: `url(/assets/event-form//al-zahia-desktop.webp)` }}
            ></div>
            {/* Blue triangle beside the white shape */}
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-[#5686DA] hidden lg:block"
              style={{ clipPath: "polygon(8% 0%, 66% 0, 59% 33%)" }}
            ></div>
            {/* White shape */}
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-white"
              style={{ clipPath: "polygon(51% 0, 60% 29%, 66% 29%, 82% 57%, 100% 100%, 50% 100%, 0 100%, 0% 70%, 0% 35%, 0 0)" }}
            ></div>
            {/* Bottom-left blue corner */}
            <div
              className="pointer-events-none absolute left-0 bottom-0 z-0 h-14 w-16 bg-[#5686DA] hidden lg:block"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
            ></div>

            {/* Mobile / tablet: photo corner + blue accents */}
            <div className="pointer-events-none absolute top-0 right-0 h-28 sm:h-40 w-[58%] z-0 lg:hidden" aria-hidden="true">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/event-form/al-zahia-mob.webp)",
                  clipPath: "polygon(38% 0, 100% 0, 100% 100%)",
                }}
              ></div>
              <div
                className="absolute inset-0 bg-[#5686DA]"
                style={{ clipPath: "polygon(18% 0, 38% 0, 100% 100%)" }}
              ></div>
            </div>
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-12 w-14 bg-[#5686DA] z-0 lg:hidden"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
              aria-hidden="true"
            ></div>

            <div className="relative z-10 max-w-6xl w-full">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base uppercase tracking-wide font-bold text-neutral-900">
                  Event Essentials
                </span>
                <span className="h-0.5 w-24 sm:w-36 bg-[#5686DA]"></span>
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#5686DA]">
                Let us start with the basics.
              </h2>
              <p className="mt-2 text-base sm:text-lg text-neutral-700">
                Only the essentials need typing. Everything else is quick-select.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">
                {[
                  { key: "clientName", label: "Client / Company Name", placeholder: "Type company or client name" },
                  { key: "eventName", label: "Event Name", placeholder: "Working title is fine" },
                ].map((field) => (
                  <label key={field.key} className="block">
                    <span className="block text-sm sm:text-base font-semibold uppercase text-neutral-900 mb-2">{field.label}</span>
                    <input
                      type="text"
                      value={formData[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-5 py-4 lg:py-5 bg-white border border-[#5686DA]/60 rounded-xl text-base sm:text-lg text-neutral-900 placeholder:text-neutral-500 outline-none focus:border-[#5686DA] focus:ring-1 focus:ring-[#5686DA] transition"
                    />
                    <FieldError message={errors[field.key]} />
                  </label>
                ))}
              </div>

              <div className="mt-6">
                <span className="block text-sm sm:text-base font-semibold uppercase text-neutral-900 mb-2">Event Date</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-3 lg:gap-6">
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    placeholder="DD/MM/YYYY"
                    className="sm:col-span-3 lg:col-span-1 w-full px-5 py-4 lg:py-6 bg-white border border-[#5686DA]/60 rounded-xl text-base sm:text-lg text-neutral-900 placeholder:text-neutral-500 outline-none focus:border-[#5686DA] focus:ring-1 focus:ring-[#5686DA] transition"
                  />
                  {[
                    { status: "Date confirmed", desc: "Final date is approved" },
                    { status: "Date flexible", desc: "A date range is possible" },
                    { status: "To be confirmed", desc: "Still under discussion" },
                  ].map((item) => {
                    const isSelected = formData.dateStatus === item.status;
                    return (
                      <button
                        key={item.status}
                        type="button"
                        onClick={() => setFormData({ ...formData, dateStatus: item.status })}
                        className={`flex items-start gap-2.5 px-4 py-4 lg:py-5 bg-white border rounded-xl text-left transition cursor-pointer ${
                          isSelected
                            ? "border-[#5686DA] bg-[#5686DA]/10 ring-1 ring-[#5686DA]"
                            : "border-[#5686DA]/60 hover:bg-[#5686DA]/5"
                        }`}
                      >
                        <span className={`mt-1 w-4 h-4 shrink-0 rounded-full border flex items-center justify-center ${isSelected ? "border-[#5686DA]" : "border-[#5686DA]/70"}`}>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#5686DA]"></span>}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-base lg:text-lg font-semibold text-neutral-900 leading-tight">{item.status}</span>
                          <span className="block text-xs text-neutral-600">{item.desc}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <FieldError message={errors.eventDate} />
              </div>

              <div className="mt-10 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-base sm:text-lg text-neutral-700">
                  You can select more than one option where relevant.
                </p>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* <button
                    onClick={prevStep}
                    className="text-neutral-600 px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    <Image src="/assets/event-form/Icon.svg" alt="" width={16} height={12} className="rotate-180 brightness-0 opacity-60" /> Back
                  </button> */}
                  <button
                    onClick={nextStep}
                    className="bg-[#5686DA] text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center gap-4 shadow-lg shadow-[#5686DA]/30 hover:bg-[#4874c2] transition cursor-pointer"
                  >
                    Continue
                    <Image src="/assets/event-form/Icon.svg" alt="" width={21} height={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Event Format */}
        {step === 3 && (
          <div className="relative h-full w-full flex-1 flex flex-col justify-center overflow-hidden px-6 pt-32 pb-10 sm:pt-44 md:px-12 lg:py-24"
>


<div 
  className="absolute  top-0 right-20  h-full w-full -translate-y-1/2 translate-x-1/2 z-[0] hidden lg:block" 
  style={{
    backgroundImage: 'url(/assets/w-dubai-universtity.webp)',
    backgroundSize: 'contain',
    backgroundPosition: 'center', // Centers the image so important parts don't get cut off on mobile
    backgroundRepeat: 'no-repeat'
  }}
>
</div>
<div className="pointer-events-none absolute  bg-primary h-[25%] w-[15%] right-[14%]   top-0 hidden lg:block z-[0]"
                style={{clipPath:" polygon(0 0, 68% 0, 100% 100%)",
                }}


          
  ></div>
  <div className="pointer-events-none absolute  bg-primary h-[25%] w-[15%] right-0 top-1/4 translate-y-1/3 hidden lg:block z-[0]"
                style={{clipPath:"polygon(0 0, 100% 100%, 100% 25%)"}}


          
  ></div>

  <div className="pointer-events-none absolute  bg-primary h-[20%] w-[15%] bottom-0 left-0 -translate-x-1/2 hidden lg:block z-[10]"
                style={{clipPath:"polygon(0 0, 100% 100%, 0 100%)"}}


          
  ></div>
<div className="bg-white absolute inset-0 z-0 hidden lg:block"                           style={{clipPath:"polygon(0% 0%, 75% 0%, 100% 50%, 100% 100%, 0% 100%)"}}
>
</div>

            {/* Mobile / tablet: photo corner + blue accents */}
            <div className="pointer-events-none absolute top-0 right-0 h-28 sm:h-40 w-[58%] z-0 lg:hidden" aria-hidden="true">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/w-dubai-universtity.webp)",
                  clipPath: "polygon(38% 0, 100% 0, 100% 100%)",
                }}
              ></div>
              <div
                className="absolute inset-0 bg-[#5686DA]"
                style={{ clipPath: "polygon(18% 0, 38% 0, 100% 100%)" }}
              ></div>
            </div>
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-12 w-14 bg-[#5686DA] z-0 lg:hidden"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
              aria-hidden="true"
            ></div>

          <div className="relative z-10 max-w-6xl w-full">
            <div className="flex items-center gap-3">
              <span className="text-sm sm:text-base uppercase tracking-wide font-bold text-neutral-900">
                Event Format
              </span>
              <span className="h-0.5 w-24 sm:w-36 bg-[#5686DA]"></span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#5686DA]">
              What kind of event is it?
            </h2>
            <p className="mt-2 text-base sm:text-lg text-neutral-700">
              Choose the environment and format that best describe the activation.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
              {[
                { label: "Outdoor / Open", desc: "Public space, park, beach or plaza", icon: "Icon (3).svg" },
                { label: "Indoor / Enclosed", desc: "Ballroom, hall, mall or venue", icon: "Icon (2).svg" },
                { label: "Semi-enclosed", desc: "Canopy, tent or partial structure", icon: "Icon (1).svg" },
                { label: "Roadshow", desc: "Repeated or touring activation", icon: "Icon (8).svg" },
                { label: "Pop-up", desc: "Compact, temporary activation", icon: "Icon (7).svg" },
                { label: "Exhibition / Booth", desc: "Trade show or exhibition stand", icon: "Icon (6).svg" },
                { label: "Conference / Gala", desc: "Stage, seating and hospitality", icon: "Icon (5).svg" },
                { label: "Festival / Community", desc: "Multi-zone public experience", icon: "Icon (4).svg" },
              ].map((fmt) => {
                const isSelected = formData.formats.includes(fmt.label);
                return (
                  <div
                    key={fmt.label}
                    onClick={() => handleCheckboxToggle("formats", fmt.label)}
                    className={`flex items-center gap-4 px-4 py-4 bg-white border rounded-xl cursor-pointer transition ${
                      isSelected
                        ? "border-[#5686DA] bg-[#5686DA]/10 ring-1 ring-[#5686DA]"
                        : "border-[#5686DA]/60 hover:bg-[#5686DA]/5"
                    }`}
                  >
                    <Image
                      src={`/assets/event-form/${encodeURIComponent(fmt.icon)}`}
                      alt=""
                      width={48}
                      height={40}
                      className="w-10 h-9 lg:w-12 lg:h-10 shrink-0 object-contain"
                    />
                    <div className="min-w-0">
                      <span className="block text-base lg:text-lg font-semibold text-neutral-900 leading-tight">
                        {fmt.label}
                      </span>
                      <span className="block text-xs text-neutral-600">{fmt.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <FieldError message={errors.formats} />

            <div className="mt-6">
              <span className="block text-sm sm:text-base uppercase font-bold text-neutral-900 mb-2">Duration</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-5">
                {["1 day", "2-7 days", "1-4 weeks", "1+ month", "Recurring / Touring"].map((dur) => {
                  const isSelected = formData.duration === dur;
                  return (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setFormData({ ...formData, duration: dur })}
                      className={`flex items-center gap-3 px-4 py-2.5 bg-white border rounded-full text-sm sm:text-base font-semibold text-left transition cursor-pointer ${
                        isSelected
                          ? "border-[#5686DA] bg-[#5686DA]/10 ring-1 ring-[#5686DA]"
                          : "border-[#5686DA]/60 hover:bg-[#5686DA]/5"
                      }`}
                    >
                      <span className={`w-4 h-4 shrink-0 rounded-full border flex items-center justify-center ${isSelected ? "border-[#5686DA]" : "border-[#5686DA]/70"}`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#5686DA]"></span>}
                      </span>
                      {dur}
                    </button>
                  );
                })}
              </div>
              <FieldError message={errors.duration} />
            </div>

            <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-base sm:text-lg text-neutral-700">
                You can select more than one option where relevant.
              </p>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* <button
                  onClick={prevStep}
                  className="text-neutral-600 px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-neutral-100 transition cursor-pointer"
                >
                  <Image src="/assets/event-form/Icon.svg" alt="" width={16} height={12} className="rotate-180 brightness-0 opacity-60" /> Back
                </button> */}
                <button
                  onClick={nextStep}
                  className="bg-[#5686DA] text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center gap-4 shadow-lg shadow-[#5686DA]/30 hover:bg-[#4874c2] transition cursor-pointer"
                >
                  Continue
                  <Image src="/assets/event-form/Icon.svg" alt="" width={21} height={15} />
                </button>
              </div>
            </div>
          </div>
          </div>
        )}

        {/* STEP 4: Space and Build */}
        {step === 4 && (
          <div className="relative h-full w-full flex-1 flex flex-col justify-center overflow-hidden px-6 pt-32 pb-10 sm:pt-44 md:px-12 lg:py-24">
            <div
              className="absolute top-0 right-0  w-[50%] aspect-[3/2] top-0  -translate-y-[14%] z-[0] translate-x-[45%] hidden lg:block"
              style={{
                backgroundImage: 'url(/assets/event-form/mvp-desktop.webp)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[25%] w-[15%] right-[15%] top-0 hidden lg:block z-[0]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 80% 0)" }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[25%] w-[15%] right-0 top-1/4 translate-y-1/3 hidden lg:block z-[0]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 100% 25%)" }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[20%] w-[15%] bottom-0 left-0 -translate-x-1/2 hidden lg:block z-[10]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
            ></div>
            <div className="bg-white absolute inset-0 z-0 hidden lg:block"
              style={{ clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 100% 100%, 0% 100%)" }}
            ></div>

            {/* Mobile / tablet: photo corner + blue accents */}
            <div className="pointer-events-none absolute top-0 right-0 h-28 sm:h-40 w-[58%] z-0 lg:hidden" aria-hidden="true">
              <div
                className="absolute inset-0 bg-cover"
                style={{
                  backgroundImage: "url(/assets/w-du_1_480x320.webp)",
                  backgroundPosition: "right",
                  clipPath: "polygon(38% 0, 100% 0, 100% 100%)",
                }}
              ></div>
              <div
                className="absolute inset-0 bg-[#5686DA]"
                style={{ clipPath: "polygon(18% 0, 38% 0, 100% 100%)" }}
              ></div>
            </div>
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-12 w-14 bg-[#5686DA] z-0 lg:hidden"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
              aria-hidden="true"
            ></div>

            <div className="relative z-10 max-w-6xl w-full">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base uppercase tracking-wide font-bold text-neutral-900">
                  Space and Build
                </span>
                <span className="h-0.5 w-24 sm:w-36 bg-[#5686DA]"></span>
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#5686DA]">
                How much space do we have?
              </h2>
              <p className="mt-2 text-base sm:text-lg text-neutral-700">
                Use approximate dimensions if the final venue drawing is not ready.
              </p>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                  {[
                    { key: "length", label: "Length", placeholder: "e.g. 20 m" },
                    { key: "width", label: "Breadth / Width", placeholder: "e.g. 12 m" },
                    { key: "heightAvailable", label: "Height Available", placeholder: "e.g. 4 m" },
                    { key: "heightRestriction", label: "Height Restriction", placeholder: "e.g. max 3.5 m" },
                  ].map((field) => (
                    <label key={field.key} className="block">
                      <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">{field.label}</span>
                      <input
                        type="text"
                        value={formData[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full px-6 py-4 lg:py-5 bg-white border border-[#5686DA]/60 rounded-xl text-lg text-neutral-900 placeholder:text-neutral-500 outline-none focus:border-[#5686DA] focus:ring-1 focus:ring-[#5686DA] transition"
                      />
                      <FieldError message={errors[field.key]} />
                    </label>
                  ))}
                </div>

                <div className="space-y-5">
                  <div>
                    <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">Quick Size Guide</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { size: "S", label: "Compact", range: "Up to 50 sq m" },
                        { size: "M", label: "Medium", range: "51-200 sq m" },
                        { size: "L", label: "Large", range: "201-500 sq m" },
                        { size: "XL", label: "Destination scale", range: "More than 500 sq m" },
                      ].map((item) => {
                        const isSelected = formData.sizeGuide === item.size;
                        return (
                          <button
                            key={item.size}
                            type="button"
                            onClick={() => setFormData({ ...formData, sizeGuide: item.size })}
                            className={`flex flex-col items-center px-2 py-3 bg-white border rounded-xl text-center transition cursor-pointer ${
                              isSelected
                                ? "border-[#5686DA] bg-[#5686DA]/10 ring-1 ring-[#5686DA]"
                                : "border-[#5686DA]/60 hover:bg-[#5686DA]/5"
                            }`}
                          >
                            <span className="text-3xl lg:text-4xl font-semibold text-[#5686DA] leading-tight">{item.size}</span>
                            <span className="text-sm font-semibold text-neutral-900">{item.label}</span>
                            <span className="text-xs text-neutral-600">{item.range}</span>
                          </button>
                        );
                      })}
                    </div>
                    <FieldError message={errors.sizeGuide} />
                  </div>

                  <label className="block">
                    <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">Site Restrictions or Access Notes</span>
                    <textarea
                      rows={2}
                      value={formData.siteNotes}
                      onChange={(e) => setFormData({ ...formData, siteNotes: e.target.value })}
                      placeholder="Optional: loading access, ceiling points, noise limits, flooring, power, approvals."
                      className="w-full px-6 py-4 bg-white border border-[#5686DA]/60 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-600 outline-none resize-none focus:border-[#5686DA] focus:ring-1 focus:ring-[#5686DA] transition"
                    />
                    <FieldError message={errors.siteNotes} />
                  </label>
                </div>
              </div>

              <div className="mt-10 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-base sm:text-lg text-neutral-700">
                  
                </p>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* <button
                    onClick={prevStep}
                    className="text-neutral-600 px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    <Image src="/assets/event-form/Icon.svg" alt="" width={16} height={12} className="rotate-180 brightness-0 opacity-60" /> Back
                  </button> */}
                  <button
                    onClick={nextStep}
                    className="bg-[#5686DA] text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center gap-4 shadow-lg shadow-[#5686DA]/30 hover:bg-[#4874c2] transition cursor-pointer"
                  >
                    Continue
                    <Image src="/assets/event-form/Icon.svg" alt="" width={21} height={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Location and Audience */}
        {step === 5 && (
          <div className="relative h-full w-full flex-1 flex flex-col justify-center overflow-hidden px-6 pt-32 pb-10 sm:pt-44 md:px-12 lg:py-24">
            <div
              className="absolute top-0 right-0 w-[40%] aspect-[3/2] translate-x-1/2   z-[0] hidden lg:block"
              style={{
                backgroundImage: 'url(/assets/w-international-film-festival_1_1_480x320.webp)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[25%] w-[15%] right-[15%] top-0 hidden lg:block z-[0]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 80% 0)" }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[25%] w-[15%] right-0 top-1/4 translate-y-1/3 hidden lg:block z-[0]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 100% 25%)" }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[20%] w-[15%] bottom-0 left-0 -translate-x-1/2 hidden lg:block z-[10]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
            ></div>
            <div className="bg-white absolute inset-0 z-0 hidden lg:block"
              style={{ clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 100% 100%, 0% 100%)" }}
            ></div>

            {/* Mobile / tablet: photo corner + blue accents */}
            <div className="pointer-events-none absolute top-0 right-0 h-28 sm:h-40 w-[58%] z-0 lg:hidden" aria-hidden="true">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/w-international-film-festival_1_1_480x320.webp)",
                  clipPath: "polygon(38% 0, 100% 0, 100% 100%)",
                }}
              ></div>
              <div
                className="absolute inset-0 bg-[#5686DA]"
                style={{ clipPath: "polygon(18% 0, 38% 0, 100% 100%)" }}
              ></div>
            </div>
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-12 w-14 bg-[#5686DA] z-0 lg:hidden"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
              aria-hidden="true"
            ></div>

            <div className="relative z-10 max-w-5xl w-full">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base uppercase tracking-wide font-bold text-neutral-900">
                  Location and Audience
                </span>
                <span className="h-0.5 w-24 sm:w-36 bg-[#5686DA]"></span>
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#5686DA]">
                Where is it, and who is coming?
              </h2>
              <p className="mt-2 text-base sm:text-lg text-neutral-700">
                Select an attendance range now, the exact number can be confirmed later.
              </p>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.6fr_1.6fr] gap-6 lg:gap-10">
                <div className="lg:row-span-2">
                  <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">Primary Audience</span>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                    {["Families", "Corporate", "VIP", "Youth / Gen Z", "Children", "Public"].map((aud) => {
                      const isSelected = formData.audience.includes(aud);
                      return (
                        <button
                          key={aud}
                          type="button"
                          onClick={() => handleCheckboxToggle("audience", aud)}
                          className={`flex items-center gap-3 px-3 py-2.5 bg-white border rounded-lg text-sm sm:text-base font-semibold text-left transition cursor-pointer ${
                            isSelected
                              ? "border-[#5686DA] bg-[#5686DA]/10 ring-1 ring-[#5686DA]"
                              : "border-[#5686DA]/60 hover:bg-[#5686DA]/5"
                          }`}
                        >
                          <span className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center ${isSelected ? "border-[#5686DA]" : "border-[#5686DA]/70"}`}>
                            {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#5686DA]"></span>}
                          </span>
                          {aud}
                        </button>
                      );
                    })}
                  </div>
                  <FieldError message={errors.audience} />
                </div>

                <div>
                  <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">Expected Attendance</span>
                  <div className="grid grid-cols-2 gap-3">
                    {["Under 50", "30-100", "100-250", "251-500", "501-1,000", "1,000+"].map((att) => {
                      const isSelected = formData.attendance === att;
                      return (
                        <button
                          key={att}
                          type="button"
                          onClick={() => setFormData({ ...formData, attendance: att })}
                          className={`flex items-center gap-3 px-3 py-3 lg:py-4 bg-white border rounded-lg text-base sm:text-lg font-semibold text-left transition cursor-pointer ${
                            isSelected
                              ? "border-[#5686DA] bg-[#5686DA]/10 ring-1 ring-[#5686DA]"
                              : "border-[#5686DA]/60 hover:bg-[#5686DA]/5"
                          }`}
                        >
                          <span className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center ${isSelected ? "border-[#5686DA]" : "border-[#5686DA]/70"}`}>
                            {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#5686DA]"></span>}
                          </span>
                          {att}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">Emirate</span>
                  <div className="grid grid-cols-2 gap-3">
                    {["Dubai", "Abu Dhabi", "Sharjah", "Other UAE"].map((em) => {
                      const isSelected = formData.emirate === em;
                      return (
                        <button
                          key={em}
                          type="button"
                          onClick={() => setFormData({ ...formData, emirate: em })}
                          className={`flex items-center gap-3 px-3 py-3 lg:py-4 bg-white border rounded-lg text-base sm:text-lg font-semibold text-left transition cursor-pointer ${
                            isSelected
                              ? "border-[#5686DA] bg-[#5686DA]/10 ring-1 ring-[#5686DA]"
                              : "border-[#5686DA]/60 hover:bg-[#5686DA]/5"
                          }`}
                        >
                          <span className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center ${isSelected ? "border-[#5686DA]" : "border-[#5686DA]/70"}`}>
                            {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#5686DA]"></span>}
                          </span>
                          {em}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="block md:col-span-2 lg:col-start-2 lg:col-span-2 lg:max-w-xl">
                  <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">Event Location / Venue</span>
                  <input
                    type="text"
                    value={formData.venueDetails}
                    onChange={(e) => setFormData({ ...formData, venueDetails: e.target.value })}
                    placeholder="Venue, mall, park, hotel or district"
                    className="w-full px-6 py-4 bg-white border border-[#5686DA]/60 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-600 outline-none focus:border-[#5686DA] focus:ring-1 focus:ring-[#5686DA] transition"
                  />
                  <FieldError message={errors.venueDetails} />
                </label>
              </div>

              <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-base sm:text-lg text-neutral-700">
                  You can select more than one option where relevant.
                </p>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* <button
                    onClick={prevStep}
                    className="text-neutral-600 px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    <Image src="/assets/event-form/Icon.svg" alt="" width={16} height={12} className="rotate-180 brightness-0 opacity-60" /> Back
                  </button> */}
                  <button
                    onClick={nextStep}
                    className="bg-[#5686DA] text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center gap-4 shadow-lg shadow-[#5686DA]/30 hover:bg-[#4874c2] transition cursor-pointer"
                  >
                    Continue
                    <Image src="/assets/event-form/Icon.svg" alt="" width={21} height={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Food & Beverage */}
        {step === 6 && (
          <div className="relative h-full w-full flex-1 flex flex-col justify-center overflow-hidden px-6 pt-32 pb-10 sm:pt-44 md:px-12 lg:py-24">
            <div
              className="absolute top-0 right-0 aspect-[3/2]  w-[45%] -translate-y-1/4 translate-x-[30%] z-[0] hidden lg:block"
              style={{
                backgroundImage: 'url(/assets/event-form/Page_6_Page.webp)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[25%] w-[15%] right-[15%] top-0 hidden lg:block z-[0]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 80% 0)" }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[25%] w-[15%] right-0 top-1/4 translate-y-1/3 hidden lg:block z-[0]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 100% 25%)" }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[20%] w-[15%] bottom-0 left-0 -translate-x-1/2 hidden lg:block z-[10]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
            ></div>
            <div className="bg-white absolute inset-0 z-0 hidden lg:block"
              style={{ clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 100% 100%, 0% 100%)" }}
            ></div>

            {/* Mobile / tablet: photo corner + blue accents */}
            <div className="pointer-events-none absolute top-0 right-0 h-28 sm:h-40 w-[58%] z-0 lg:hidden" aria-hidden="true">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/w-dubai-universtity.webp)",
                  clipPath: "polygon(38% 0, 100% 0, 100% 100%)",
                }}
              ></div>
              <div
                className="absolute inset-0 bg-[#5686DA]"
                style={{ clipPath: "polygon(18% 0, 38% 0, 100% 100%)" }}
              ></div>
            </div>
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-12 w-14 bg-[#5686DA] z-0 lg:hidden"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
              aria-hidden="true"
            ></div>

            <div className="relative z-10 max-w-5xl w-full">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base uppercase tracking-wide font-bold text-neutral-900">
                  Food and Beverage
                </span>
                <span className="h-0.5 w-24 sm:w-36 bg-[#5686DA]"></span>
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#5686DA]">
                What level of F&amp;B is required?
              </h2>
              <p className="mt-2 text-base sm:text-lg text-neutral-700">
                Choose one main requirement, then add any service styles that apply.
              </p>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                  {[
                    { title: "No F&B", desc: "No catering or food service required", icon: "Icon-6(3).svg" },
                    { title: "Light refreshments", desc: "Water, coffee, tea and snacks", icon: "Icon-6(4).svg" },
                    { title: "Full catering", desc: "Meal service for invited guests", icon: "Icon-6(5).svg" },
                    { title: "Public vendors", desc: "Kiosks, trucks or concessions", icon: "Icon-6(2).svg" },
                  ].map((item) => {
                    const isSelected = formData.fbRequirement === item.title;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => selectFbRequirement(item.title)}
                        className={`flex items-center gap-4 px-5 py-4 lg:py-5 bg-white border rounded-xl text-left transition cursor-pointer ${
                          isSelected
                            ? "border-[#5686DA] bg-[#5686DA]/10 ring-1 ring-[#5686DA]"
                            : "border-[#5686DA]/60 hover:bg-[#5686DA]/5"
                        }`}
                      >
                        <Image
                          src={`/assets/event-form/${encodeURIComponent(item.icon)}`}
                          alt=""
                          width={48}
                          height={40}
                          className="w-10 h-9 lg:w-12 lg:h-10 shrink-0 object-contain"
                        />
                        <span className="min-w-0">
                          <span className="block text-base lg:text-lg font-semibold text-neutral-900 leading-tight">{item.title}</span>
                          <span className="block text-xs sm:text-sm text-neutral-600 leading-snug">{item.desc}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div>
                  <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">Service Style - Select all that apply</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-3">
                    {[
                      "Passed service",
                      "Buffet",
                      "Seated dining",
                      "Live stations",
                      "Food kiosks",
                      "Food trucks",
                      "Coffee cart",
                      "Branded treats",
                    ].map((style) => {
                      const isSelected = formData.serviceStyles.includes(style);
                      const isRelevant = (SERVICE_STYLES_BY_REQUIREMENT[formData.fbRequirement] || []).includes(style);
                      return (
                        <button
                          key={style}
                          type="button"
                          disabled={!isRelevant}
                          onClick={() => handleCheckboxToggle("serviceStyles", style)}
                          className={`flex items-center gap-2.5 px-3 py-2.5 bg-white border rounded-lg text-sm sm:text-base font-semibold text-left transition ${
                            isSelected
                              ? "border-[#5686DA] bg-[#5686DA]/10 ring-1 ring-[#5686DA] cursor-pointer"
                              : isRelevant
                              ? "border-[#5686DA]/60 hover:bg-[#5686DA]/5 cursor-pointer"
                              : "border-neutral-200 text-neutral-400 cursor-not-allowed"
                          }`}
                        >
                          <span className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center ${isSelected ? "border-[#5686DA]" : "border-[#5686DA]/70"}`}>
                            {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#5686DA]"></span>}
                          </span>
                          {style}
                        </button>
                      );
                    })}
                  </div>
                  <FieldError message={errors.serviceStyles} />
                </div>
              </div>

              <label className="block mt-6 lg:max-w-3xl">
                <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">Dietary, Cuisine or Branding Notes</span>
                <input
                  type="text"
                  value={formData.fbNotes}
                  onChange={(e) => setFormData({ ...formData, fbNotes: e.target.value })}
                  placeholder="Optional: halal, vegan, allergy needs, preferred cuisine, branded packaging..."
                  className="w-full px-6 py-4 lg:py-5 bg-white border border-[#5686DA]/60 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-600 outline-none focus:border-[#5686DA] focus:ring-1 focus:ring-[#5686DA] transition"
                />
                <FieldError message={errors.fbNotes} />
              </label>

              <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-base sm:text-lg text-neutral-700">
                  You can select more than one option where relevant.
                </p>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* <button
                    onClick={prevStep}
                    className="text-neutral-600 px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    <Image src="/assets/event-form/Icon.svg" alt="" width={16} height={12} className="rotate-180 brightness-0 opacity-60" /> Back
                  </button> */}
                  <button
                    onClick={nextStep}
                    className="bg-[#5686DA] text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center gap-4 shadow-lg shadow-[#5686DA]/30 hover:bg-[#4874c2] transition cursor-pointer"
                  >
                    Continue
                    <Image src="/assets/event-form/Icon.svg" alt="" width={21} height={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Entertainment */}
        {step === 7 && (
          <div className="relative h-full w-full flex-1 flex flex-col justify-center overflow-hidden px-6 pt-32 pb-10 sm:pt-44 md:px-12 lg:py-24">
            <div
              className="absolute top-0 right-0 aspect-[3/2] w-[65%]  -translate-y-[30%] translate-x-[25%] z-[0] hidden lg:block"
              style={{
                backgroundImage: 'url(/assets/event-form/Page_7_Page.webp)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[25%] w-[15%] right-[15%] top-0 hidden lg:block z-[0]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 80% 0)" }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[25%] w-[15%] right-0 top-1/4 translate-y-1/3 hidden lg:block z-[0]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 100% 25%)" }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[20%] w-[15%] bottom-0 left-0 -translate-x-1/2 hidden lg:block z-[10]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
            ></div>
            <div className="bg-white absolute inset-0 z-0 hidden lg:block"
              style={{ clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 100% 100%, 0% 100%)" }}
            ></div>

            {/* Mobile / tablet: photo corner + blue accents */}
            <div className="pointer-events-none absolute top-0 right-0 h-28 sm:h-40 w-[58%] z-0 lg:hidden" aria-hidden="true">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/w-dubai-universtity.webp)",
                  clipPath: "polygon(38% 0, 100% 0, 100% 100%)",
                }}
              ></div>
              <div
                className="absolute inset-0 bg-[#5686DA]"
                style={{ clipPath: "polygon(18% 0, 38% 0, 100% 100%)" }}
              ></div>
            </div>
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-12 w-14 bg-[#5686DA] z-0 lg:hidden"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
              aria-hidden="true"
            ></div>

            <div className="relative z-10 max-w-6xl w-full">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base uppercase tracking-wide font-bold text-neutral-900">
                  Entertainment
                </span>
                <span className="h-0.5 w-24 sm:w-36 bg-[#5686DA]"></span>
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#5686DA]">
                What should guests experience?
              </h2>
              <p className="mt-2 text-base sm:text-lg text-neutral-700">
                Select as many as needed. We can recommend the final mix and running order.
              </p>

              <div className="mt-6 grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 lg:max-w-5xl">
                {[
                  { label: "No entertainment", icon: "Icons-7(10).svg" },
                  { label: "DJ / music", icon: "Icons-7(12).svg" },
                  { label: "Live band", icon: "Icons-7(11).svg" },
                  { label: "Cultural acts", icon: "Icons-7(9).svg" },
                  { label: "Roaming performers", icon: "Icons-7(1).svg" },
                  { label: "Kids entertainment", icon: "Icons-7(2).svg" },
                  { label: "Host / MC", icon: "Icons-7(3).svg" },
                  { label: "Celebrity / talent", icon: "Icons-7(4).svg" },
                  { label: "Workshops", icon: "Icons-7(6).svg" },
                  { label: "Interactive games", icon: "Icons-7(7).svg" },
                  { label: "Sports activation", icon: "Icons-7(8).svg" },
                  { label: "Other/recommend", icon: "Icons-7(5).svg" },
                ].map((item) => {
                  const isSelected = formData.entertainment.includes(item.label);
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleCheckboxToggle("entertainment", item.label)}
                      className={`flex items-center gap-3 px-3 py-3.5 bg-white border rounded-xl text-left transition cursor-pointer ${
                        isSelected
                          ? "border-[#5686DA] bg-[#5686DA]/10 ring-1 ring-[#5686DA]"
                          : "border-[#5686DA]/60 hover:bg-[#5686DA]/5"
                      }`}
                    >
                      <Image
                        src={`/assets/event-form/${encodeURIComponent(item.icon)}`}
                        alt=""
                        width={36}
                        height={36}
                        className="w-8 h-8 lg:w-9 lg:h-9 shrink-0 object-contain"
                      />
                      <span className="text-sm lg:text-base font-semibold text-neutral-900 leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              <FieldError message={errors.entertainment} />

              <label className="block mt-6 lg:max-w-3xl">
                <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">Entertainment Notes</span>
                <textarea
                  rows={2}
                  value={formData.entertainmentNotes}
                  onChange={(e) => setFormData({ ...formData, entertainmentNotes: e.target.value })}
                  placeholder="Optional: preferred performer, show frequency, cultural requirements, sound limits..."
                  className="w-full px-4 py-4 lg:py-6 bg-white border border-[#5686DA]/60 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-600 outline-none resize-none focus:border-[#5686DA] focus:ring-1 focus:ring-[#5686DA] transition"
                />
                <FieldError message={errors.entertainmentNotes} />
              </label>

              <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-base sm:text-lg text-neutral-700">
                  You can select more than one option where relevant.
                </p>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* <button
                    onClick={prevStep}
                    className="text-neutral-600 px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    <Image src="/assets/event-form/Icon.svg" alt="" width={16} height={12} className="rotate-180 brightness-0 opacity-60" /> Back
                  </button> */}
                  <button
                    onClick={nextStep}
                    className="bg-[#5686DA] text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center gap-4 shadow-lg shadow-[#5686DA]/30 hover:bg-[#4874c2] transition cursor-pointer"
                  >
                    Continue
                    <Image src="/assets/event-form/Icon.svg" alt="" width={21} height={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: Creative Direction */}
        {step === 8 && (
          <div className="relative h-full w-full flex-1 flex flex-col justify-center overflow-hidden px-6 pt-32 pb-10 sm:pt-44 md:px-12 lg:py-24">
            <div
              className="absolute top-0 right-20 aspect-[3/2] h-full w-[55%] -translate-y-1/4 translate-x-[45%] z-[0] hidden lg:block"
              style={{
                backgroundImage: 'url(/assets/w-dubai-universtity.webp)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[25%] w-[15%] right-[15%] top-0 hidden lg:block z-[0]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 80% 0)" }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[25%] w-[15%] right-0 top-1/4 translate-y-1/3 hidden lg:block z-[0]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 100% 25%)" }}
            ></div>
            <div className="pointer-events-none absolute bg-primary h-[20%] w-[15%] bottom-0 left-0 -translate-x-1/2 hidden lg:block z-[0]"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
            ></div>
            <div className="bg-white absolute inset-0 z-0 hidden lg:block"
              style={{ clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 100% 100%, 0% 100%)" }}
            ></div>

            {/* Mobile / tablet: photo corner + blue accents */}
            <div className="pointer-events-none absolute top-0 right-0 h-28 sm:h-40 w-[58%] z-0 lg:hidden" aria-hidden="true">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/w-dubai-universtity.webp)",
                  clipPath: "polygon(38% 0, 100% 0, 100% 100%)",
                }}
              ></div>
              <div
                className="absolute inset-0 bg-[#5686DA]"
                style={{ clipPath: "polygon(18% 0, 38% 0, 100% 100%)" }}
              ></div>
            </div>
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-12 w-14 bg-[#5686DA] z-0 lg:hidden"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
              aria-hidden="true"
            ></div>

            <div className="relative z-10 max-w-6xl w-full">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base uppercase tracking-wide font-bold text-neutral-900">
                  Creative Direction
                </span>
                <span className="h-0.5 w-24 sm:w-36 bg-[#5686DA]"></span>
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#5686DA]">
                Give us the idea in a few words.
              </h2>
              <p className="mt-2 text-base sm:text-lg text-neutral-700">
                A short sentence is enough. Add references or a detailed brief later if you have them.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 lg:max-w-5xl">
                <label className="block">
                  <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">Short Description</span>
                  <textarea
                    rows={5}
                    value={formData.creativeDescription}
                    onChange={(e) => setFormData({ ...formData, creativeDescription: e.target.value })}
                    placeholder="Example: A modern UAE community festival with family activities, local F&B and a central live stage"
                    className="w-full px-6 py-4 bg-white border border-[#5686DA]/60 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-600 outline-none resize-none focus:border-[#5686DA] focus:ring-1 focus:ring-[#5686DA] transition"
                  />
                  <FieldError message={errors.creativeDescription} />
                </label>

                <div>
                  <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">What matters most? - Choose at least three</span>
                  <div className="grid grid-cols-2 gap-3 lg:max-w-md">
                    {["Premium look", "Fast build", "Guest engagement", "Sustainability", "Social content", "Budget efficiency"].map((item) => {
                      const isSelected = formData.priorities.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleCheckboxToggle("priorities", item)}
                          className={`px-3 py-2.5 bg-white border rounded-lg text-sm sm:text-base font-semibold text-center transition cursor-pointer ${
                            isSelected
                              ? "border-[#5686DA] bg-[#5686DA]/10 ring-1 ring-[#5686DA]"
                              : "border-[#5686DA]/60 hover:bg-[#5686DA]/5"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                  <FieldError message={errors.priorities} />
                </div>
              </div>

              <label className="block mt-6 lg:max-w-3xl">
                <span className="block text-base sm:text-lg uppercase text-neutral-900 mb-1.5">Anything else we should know?</span>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any additional notes, goals or special requirements..."
                  className="w-full px-6 py-4 bg-white border border-[#5686DA]/60 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-600 outline-none resize-none focus:border-[#5686DA] focus:ring-1 focus:ring-[#5686DA] transition"
                />
                <FieldError message={errors.notes} />
              </label>

              <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-base sm:text-lg text-neutral-700">
                  You can select more than one option where relevant.
                </p>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {/* <button
                    onClick={prevStep}
                    className="text-neutral-600 px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    <Image src="/assets/event-form/Icon.svg" alt="" width={16} height={12} className="rotate-180 brightness-0 opacity-60" /> Back
                  </button> */}
                  <button
                    onClick={nextStep}
                    className="bg-[#5686DA] text-white px-8 sm:px-10 py-4 rounded-full text-lg font-semibold flex items-center gap-4 shadow-lg shadow-[#5686DA]/30 hover:bg-[#4874c2] transition cursor-pointer"
                  >
                    Review brief
                    <Image src="/assets/event-form/Icon.svg" alt="" width={21} height={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 9: Review & Submit */}
        {step === 9 && (
          <div className="relative h-full w-full flex-1 flex flex-col justify-center overflow-hidden px-6 pt-32 pb-16 sm:pb-0 sm:pt-44 md:px-12 lg:py-24">
            {/* Background photo */}
            <div
              className="pointer-events-none absolute inset-0 translate-x-1/8 -translate-y-1/6  z-0 bg-cover top-0 right-0 hidden lg:block"
              style={{ backgroundImage: "url(/assets/summerrush.webp)" }}
            ></div>
            {/* Blue triangles beside the white cut */}
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-[#5686DA] hidden lg:block"
              style={{ clipPath: "polygon(50% 0, 65.4% 0, 72% 43%)" }}
            ></div>
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-[#5686DA] hidden lg:block"
              style={{ clipPath: "polygon(82% 62%, 100% 80%, 100% 100%)" }}
            ></div>
            {/* White cut */}
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-white hidden lg:block"
              style={{ clipPath: "polygon(0 0, 50% 0, 72% 43%, 82% 62%, 100% 100%, 0 100%)" }}
            ></div>
            {/* Bottom-left blue corner */}
            <div
              className="pointer-events-none absolute left-0 bottom-0 z-0 h-14 w-16 bg-[#5686DA] hidden lg:block"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
            ></div>

            {/* Mobile / tablet: photo corner + blue accents */}
            <div className="pointer-events-none absolute top-0 right-0 h-28 sm:h-40 w-[58%] z-0 lg:hidden" aria-hidden="true">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/summerrush-mobile.webp)",
                  clipPath: "polygon(38% 0, 100% 0, 100% 100%)",
                }}
              ></div>
              <div
                className="absolute inset-0 bg-[#5686DA]"
                style={{ clipPath: "polygon(18% 0, 38% 0, 100% 100%)" }}
              ></div>
            </div>
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-12 w-14 bg-[#5686DA] z-0 lg:hidden"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
              aria-hidden="true"
            ></div>

            <div className="relative z-10 max-w-6xl w-full">
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base uppercase tracking-wide font-bold text-neutral-900">
                  Ready to Submit
                </span>
                <span className="h-0.5 w-24 sm:w-36 bg-[#5686DA]"></span>
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#5686DA]">
                Your event brief is ready.
              </h2>
              <p className="mt-2 text-base sm:text-lg text-neutral-700">
                Review the selected answers, add your contact details, then send it to the project team.
              </p>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5 lg:gap-7 lg:max-w-5xl">
                {/* Snapshot */}
                <div className="bg-white border border-[#5686DA]/60 rounded-2xl p-6">
                  <span className="block text-base font-semibold uppercase text-[#5686DA] mb-3">Event Snapshot</span>
                  <div className="divide-y divide-transparent">
                    {[
                      { label: "Client / Event", icon: "Contact-9 Box Icon (3).svg", value: [formData.clientName, formData.eventName].filter(Boolean).join(" / ") },
                      { label: "Date / Location", icon: "Contact-9 Box Icon (4).svg", value: [formData.eventDate, formData.venueDetails, formData.emirate].filter(Boolean).join(" / ") },
                      { label: "Format / Duration", icon: "Contact-9 Box Icon (5).svg", value: [formData.formats.join(", "), formData.duration].filter(Boolean).join(" / ") },
                      { label: "Size / Attendance", icon: "Contact-9 Box Icon (6).svg", value: [formData.sizeGuide, formData.attendance, formData.audience.join(", ")].filter(Boolean).join(" / ") },
                      { label: "F&B / Entertainment", icon: "Contact-9 Box Icon (7).svg", value: [formData.fbRequirement, formData.entertainment.join(", ")].filter(Boolean).join(" / ") },
                    ].map((row) => (
                      <div key={row.label} className="flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-4 py-2.5">
                        <span className="flex items-center gap-3 sm:w-52 shrink-0">
                          <span className="w-7 h-7 shrink-0 flex items-center justify-center">
                            {row.icon && (
                              <Image src={`/assets/event-form/${encodeURIComponent(row.icon)}`} alt="" width={26} height={26} className="w-6 h-6 object-contain" />
                            )}
                          </span>
                          <span className="text-sm font-medium uppercase text-neutral-900">{row.label}</span>
                        </span>
                        <span className="flex-1 min-w-0 border-b-2 border-neutral-900 pb-1 pl-10 sm:pl-0 text-sm text-neutral-700 break-words min-h-[1.75rem]">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-[#5686DA] rounded-2xl p-5 sm:p-7 text-white flex flex-col">
                  <span className="block text-base font-semibold uppercase mb-4">Contact Details</span>
                  <div className="space-y-5">
                    {[
                      { key: "name", label: "Name", placeholder: "Your full name", type: "text", icon: "Contact-9 Box Icon (1).svg" },
                      { key: "email", label: "Email", placeholder: "youremail@company.com", type: "email", icon: "Contact-9 Box Icon (2).svg" },
                      { key: "phone", label: "Phone number", placeholder: "+971 50 123 4567", type: "tel", icon: "Contact-10-Icons (5).svg", invert: true },
                    ].map((field) => (
                      <label key={field.key} className="flex items-start gap-3">
                        <span className="w-9 h-9 shrink-0 flex items-center justify-center">
                          {field.icon && (
                            <Image src={`/assets/event-form/${encodeURIComponent(field.icon)}`} alt="" width={36} height={36} className={`w-9 h-9 object-contain ${field.invert ? "brightness-0 invert" : ""}`} />
                          )}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold">{field.label}</span>
                          <input
                            type={field.type}
                            value={formData[field.key]}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full bg-transparent border-b border-white/80 py-1 text-sm text-white placeholder:text-white/70 outline-none focus:border-white"
                          />
                          <FieldError message={errors[field.key]} className="font-medium text-red-200" />
                        </span>
                      </label>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="mt-6 w-full bg-white text-[#5686DA] py-3.5 rounded-full text-base sm:text-lg font-semibold uppercase hover:bg-white/90 transition cursor-pointer disabled:opacity-70 disabled:cursor-wait"
                  >
                    {submitting ? "Sending..." : "Submit Event Brief"}
                  </button>
                  <FieldError message={submitError} className="font-medium text-yellow-200" />
                  <span className="mt-3 text-xs text-white/90">We will contact you to confirm scope and next steps.</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-base sm:text-lg font-semibold uppercase text-neutral-900">
                  Thank you - We are excited to create this with you.
                </p>
                {/* <button
                  onClick={prevStep}
                  className="self-end sm:self-auto text-neutral-600 px-5 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-neutral-100 transition cursor-pointer"
                >
                  <Image src="/assets/event-form/Icon.svg" alt="" width={16} height={12} className="rotate-180 brightness-0 opacity-60" /> Back
                </button> */}
              </div>
            </div>
          </div>
        )}

        {/* STEP 10: Contact Us */}
        {step === 10 && (
          <div className="relative h-full w-full flex-1 flex flex-col justify-center overflow-hidden px-6 pt-32 pb-10 sm:pt-44 md:px-12 lg:py-24">
            {/* Blue band (Page 10.svg), pinned top-right — 702 units wide vs the photo's 583 */}
            <Image
              src="/assets/event-form/page-10.svg"
              alt=""
              aria-hidden="true"
              width={702}
              height={614}
              priority
              className="pointer-events-none absolute -top-10 right-0 z-20 w-[60.7%] h-auto hidden lg:block"
            />
            {/* Shaped photo, pinned top-right */}
            {/* <Image
              src="/assets/w-ferjan-festival.webp"
              alt=""
              aria-hidden="true"
              width={583}
              height={489}
              priority
              className="pointer-events-none absolute z-0 top-0 right-0 z-0 w-[50.4%] h-auto hidden lg:block"
            /> */}
 <div
              className="pointer-events-none absolute inset-0 z-0 translate-x-1/4 -translate-y-54 bg-cover  hidden lg:block"
              style={{ backgroundImage: "url(/assets/w-ferjan-festival.webp)" }}
            ></div>
            {/* White background with the photo-shaped cut-out (Image Shape.svg outline) */}
            <svg
              className="pointer-events-none absolute top-0 right-0 z-[5] w-[50.4%] h-auto overflow-visible hidden lg:block"
              viewBox="0 0 583.22 489.45"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                fill="#fff"
                d="M-5000,-5000H5000V5000H-5000Z M800,-100V568.25L583.22,489.45l-437.89-159.16c-4.21-1.53-8.77-1.8-13.11-.7-5.25,1.33-13.4,2.13-21.74-2-9.86-4.87-13.84-13.56-14.86-16L-30.7,-100Z"
              />
            </svg>

            {/* Bottom-left blue corner */}
            <div
              className="pointer-events-none absolute left-0 bottom-0 z-[6] h-14 w-16 bg-[#5686DA] hidden lg:block"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
            ></div>

            {/* Mobile / tablet: photo corner + blue accents */}
            <div className="pointer-events-none absolute top-0 right-0 h-28 sm:h-40 w-[58%] z-0 lg:hidden" aria-hidden="true">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/event-form/w-ferjan-festival-mob.webp)",
                  clipPath: "polygon(38% 0, 100% 0, 100% 100%)",
                }}
              ></div>
              <div
                className="absolute inset-0 bg-[#5686DA]"
                style={{ clipPath: "polygon(18% 0, 38% 0, 100% 100%)" }}
              ></div>
            </div>
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-12 w-14 bg-[#5686DA] z-0 lg:hidden"
              style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
              aria-hidden="true"
            ></div>

            <div className="relative z-30  h-full w-full grid grid-cols-1  lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm sm:text-base uppercase tracking-wide font-bold text-neutral-900">
                    Let&apos;s Connect
                  </span>
                  <span className="h-0.5 w-24 sm:w-36 bg-[#5686DA]"></span>
                </div>
                <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] tracking-tight">
                  <span className="block text-neutral-900">Contact Us</span>
                  <span className="block text-[#5686DA]">Today</span>
                </h2>
                <p className="mt-3 text-base sm:text-lg text-neutral-700 max-w-sm">
                  Reach out to our team and we&apos;ll get back to you within a day.
                </p>

                <div className="mt-5 space-y-4">
                  {[
                    { title: "+971 4 228 0856", sub: "Give us a call", href: "tel:+97142280856", icon: "Contact-10-Icons (5).svg" },
                    { title: "info@leapevents.ae", sub: "Send us an email", href: "mailto:info@leapevents.ae", icon: "Contact-10-Icons (3).svg" },
                    { title: "www.leapevents.ae", sub: "Visit our website", href: "https://www.leapevents.ae", icon: "Contact-10-Icons (4).svg" },
                  ].map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 group w-fit"
                    >
                      <span className="w-10 h-10 shrink-0 flex items-center justify-center">
                        {item.icon && (
                          <Image src={`/assets/event-form/${encodeURIComponent(item.icon)}`} alt="" width={40} height={40} className="w-10 h-10 object-contain" />
                        )}
                      </span>
                      <span>
                        <span className="block text-base sm:text-lg font-semibold text-neutral-900 group-hover:text-[#5686DA] transition">{item.title}</span>
                        <span className="block text-xs sm:text-sm text-neutral-600">{item.sub}</span>
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
                  <a
                    href="https://www.leapevents.ae"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit bg-[#5686DA] text-white px-8 sm:px-10 py-4 rounded-full text-lg sm:text-xl font-semibold uppercase flex items-center gap-5 shadow-lg shadow-[#5686DA]/30 hover:bg-[#4874c2] transition"
                  >
                    Explore More
                    <Image src="/assets/event-form/Icon.svg" alt="" width={21} height={15} />
                  </a>
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block h-0.5 w-16 bg-[#5686DA]"></span>
                    <span className="flex flex-wrap gap-x-3 text-sm sm:text-base uppercase text-neutral-900">
                      <span>Ideas</span><span>Spaces</span><span>People</span><span>Impact</span>
                    </span>
                  </div>
                </div>
              </div>
<div className="w-full h-full flex items-center justify-center ">        
       <div className="w-full max-w-sm lg:max-w-none lg:w-[clamp(360px,28vw,520px)] lg:aspect-[296/372] lg:justify-center mx-auto lg:mx-0 bg-white border border-[#5686DA]/60 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-sm  lg:-translate-x-2 lg:-translate-y-8">
                <span className="text-base font-semibold uppercase text-[#5686DA]">Scan to Connect</span>
                <div className="mt-3 w-full aspect-square max-w-[260px] lg:max-w-none lg:w-[86%] p-2 flex items-center justify-center">
                  <Image
                    src="/assets/event-form/QR%20COde.svg"
                    alt="QR code to contact Leap Events"
                    width={340}
                    height={340}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="mt-4 text-sm text-neutral-800">
                  Scan the QR code to get <br className="hidden sm:block" />in touch with our team directly.
                </p>
                <a
                  href="mailto:info@leapevents.ae"
                  className="mt-4 w-full bg-[#5686DA] text-white px-6 py-3 rounded-full text-base font-semibold uppercase flex items-center justify-center gap-3 hover:bg-[#4874c2] transition"
                >
                  Contact Us Today
                  <Image src="/assets/event-form/Icon.svg" alt="" width={21} height={15} />
                </a>
              </div>
              </div> 
            </div>
          </div>
        )}
      </div>

   
    </main>
  );
}