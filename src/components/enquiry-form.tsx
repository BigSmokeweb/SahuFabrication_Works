"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  enquirySchema,
  serviceOptions,
  formatEnquiry,
  type Enquiry,
} from "@/lib/enquiry-schema";
export function EnquiryForm({
  service = "",
  enabled = false,
}: {
  service?: string;
  enabled?: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      service: serviceOptions.includes(service) ? service : "",
      website: "",
    },
  });
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [copy, setCopy] = useState("");
  const [summary, setSummary] = useState("");
  const key = useRef<string | null>(null);
  const lastPayload = useRef("");
  async function submit(data: Enquiry) {
    setStatus("");
    setSuccess(false);
    const payload = JSON.stringify(data);
    if (lastPayload.current !== payload) key.current = null;
    lastPayload.current = payload;
    key.current ??= crypto.randomUUID();
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": key.current,
        },
        body: payload,
        signal: AbortSignal.timeout(15000),
      });
      const result = await res.json();
      setStatus(result.message || "Please try again.");
      if (res.ok) {
        setSuccess(true);
        reset();
        key.current = null;
      } else if (res.status < 500) {
        key.current = null;
      }
    } catch {
      setStatus(
        "Delivery could not be confirmed. Your enquiry is still in the form. Please copy it or retry.",
      );
    }
  }
  async function copyEnquiry() {
    const text = formatEnquiry(getValues());
    try {
      await navigator.clipboard.writeText(text);
      setCopy(
        "Enquiry copied. Keep it for when contact details are available.",
      );
    } catch {
      setSummary(text);
      setCopy("Select and copy the enquiry below.");
    }
  }
  const field = (
    name: "name" | "phone" | "email",
    label: string,
    type = "text",
  ) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name)}
        id={name}
        type={type}
        autoComplete={
          name === "name" ? "name" : name === "phone" ? "tel" : "email"
        }
        maxLength={name === "name" ? 80 : name === "phone" ? 15 : 254}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? name + "-error" : undefined}
      />
      {errors[name] && (
        <span id={name + "-error"} className="error-text">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
  return (
    <div className="form-panel" id="enquiry">
      <h2>Tell us what you need.</h2>
      <p>
        Share a few details about your project and the service you’re looking
        for.
      </p>
      {!enabled && (
        <p className="notice">
          Online delivery will open after contact setup. You can prepare and
          copy your enquiry below.
        </p>
      )}
      <form onSubmit={(e) => void handleSubmit(submit)(e)} noValidate>
        {/* Do not store enquiry data in browser storage. */}
        <div className="form-grid">
          {field("name", "Your name *")}
          {field("phone", "Phone number *", "tel")}
          {field("email", "Email address (optional)", "email")}
          <div className="field">
            <label htmlFor="service">Required service *</label>
            <select
              {...register("service")}
              id="service"
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "service-error" : undefined}
            >
              <option value="">Select a service</option>
              {serviceOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {errors.service && (
              <span id="service-error" className="error-text">
                {errors.service.message}
              </span>
            )}
          </div>
          <div className="field full">
            <label htmlFor="message">About your requirement *</label>
            <textarea
              {...register("message")}
              id="message"
              maxLength={2000}
              placeholder="Tell us about the opening size, site, preferred material or finish…"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span className="error-text" id="message-error">
                {errors.message.message}
              </span>
            )}
          </div>
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input
            {...register("website")}
            id="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <label className="consent">
          <input
            {...register("consent")}
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I agree to the use of these details to respond to my enquiry, as
            described in the <Link href="/privacy">Privacy Policy</Link>. *
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="error-text">
            {errors.consent.message}
          </p>
        )}
        <div className="form-actions">
          <button
            className="button primary"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Sending Enquiry…" : "Send Enquiry"}
          </button>
          <button className="button dark" onClick={copyEnquiry} type="button">
            Copy Enquiry
          </button>
        </div>
        <div aria-live="polite" role="status">
          {status && (
            <p className={"status" + (success ? " success" : "")}>{status}</p>
          )}
          {copy && <p className="status">{copy}</p>}
        </div>
        {summary && (
          <textarea
            className="summary-area"
            aria-label="Enquiry to copy"
            value={summary}
            readOnly
            onFocus={(e) => e.target.select()}
          />
        )}
      </form>
    </div>
  );
}
