import { z } from "zod";

// Service styles that make sense for each main F&B requirement (step 6)
export const SERVICE_STYLES_BY_REQUIREMENT = {
  "No F&B": [],
  "Light refreshments": ["Passed service", "Live stations", "Coffee cart", "Branded treats"],
  "Full catering": ["Passed service", "Buffet", "Seated dining", "Live stations"],
  "Public vendors": ["Food kiosks", "Food trucks", "Coffee cart", "Branded treats"],
};
const cleanPhone = (v) => v.replace(/[\s\-()]/g, "");

// UAE mobile: optional +971 / 00971 / 971 / 0, then 5X + 7 digits (X = 0, 2, 4, 5, 6, 8)
const UAE_MOBILE = /^(?:\+971|00971|971|0)?5[024568]\d{7}$/;

// Inputs always give strings ("12345" too), so also require at least one letter (any language)
const required = (label, max = 120) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be ${max} characters or fewer`)
    .regex(/\p{L}/u, `${label} must include letters, not only numbers or symbols`);
const optionalNote = (label, max = 500) =>
  z.string().trim().max(max, `${label} must be ${max} characters or fewer`);
const dimension = (label) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(30, `${label} must be 30 characters or fewer`)
    .regex(/^(max\s*)?\d+(\.\d+)?\s*(m|ft)?$/i, `${label} should be a number, e.g. 20 m`);

// "20" → "20 m", "max 3.5" → "max 3.5 m"; values that already have a unit are left as typed
export const DIMENSION_FIELDS = ["length", "width", "heightAvailable", "heightRestriction"];
export const withMeters = (value) => {
  const v = String(value ?? "").trim();
  return /\d$/.test(v) ? `${v} m` : v;
};

export const stepSchemas = {
  2: z.object({
    clientName: required("Client / company name"),
    eventName: required("Event name"),
    // <input type="date"> always gives YYYY-MM-DD
    eventDate: z
      .string()
      .min(1, "Event date is required")
      .refine((v) => v >= new Date().toLocaleDateString("en-CA"), "Event date can't be in the past"),
  }),
  3: z.object({
    formats: z.array(z.string()).min(1, "Select at least one event format"),
    duration: z.string().min(1, "Choose a duration"),
  }),
  4: z.object({
    length: dimension("Length"),
    width: dimension("Breadth / width"),
    heightAvailable: dimension("Height available"),
    sizeGuide: z.string().min(1, "Choose a size from the quick size guide"),
    siteNotes: optionalNote("Site notes"),
  }),
  5: z.object({
    audience: z.array(z.string()).min(1, "Select at least one primary audience"),
    venueDetails: required("Event location / venue", 200),
  }),
  6: z
    .object({
      fbRequirement: z.string().min(1, "Choose a main F&B requirement"),
      serviceStyles: z.array(z.string()),
      fbNotes: optionalNote("F&B notes"),
    })
    .refine(
      (d) => d.serviceStyles.every((s) => (SERVICE_STYLES_BY_REQUIREMENT[d.fbRequirement] || []).includes(s)),
      { path: ["serviceStyles"], message: "Some service styles don't apply to the selected requirement" }
    ),
  7: z.object({
    entertainment: z.array(z.string()).min(1, "Select at least one entertainment option"),
    entertainmentNotes: optionalNote("Entertainment notes"),
  }),
  8: z.object({
    creativeDescription: required("Short description", 1000),
    priorities: z.array(z.string()).min(3, "Select at least 3 priorities"),
    notes: optionalNote("Notes"),
  }),
  9: z.object({
    name: required("Name"),
    email: z.string().trim().min(1, "Email is required").pipe(z.email("Enter a valid email address")),
 phone: z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .refine((v) => UAE_MOBILE.test(cleanPhone(v)), "Enter a valid UAE mobile number, e.g. +971 50 123 4567"),
  }),
};

// Returns { field: "first error message" } for the given step, or {} when valid
export const validateStep = (step, data) => {
  const schema = stepSchemas[step];
  if (!schema) return {};
  const result = schema.safeParse(data);
  if (result.success) return {};
  const errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
};
