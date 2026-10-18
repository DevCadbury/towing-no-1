"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  usePhoneInput,
  defaultCountries,
  parseCountry,
  FlagImage,
  type CountryIso2,
} from "react-international-phone";
import "react-international-phone/style.css";

/**
 * International phone input with a SEARCHABLE country dropdown + flags.
 *
 * Built on react-international-phone's `usePhoneInput` hook (for dial-code
 * handling/formatting) plus its country data and `FlagImage`, with our own
 * searchable dropdown UI (the library has no built-in search). The value passed
 * to `onChange` is the full international number (E.164, e.g. "+14035550100").
 */
interface PhoneFieldProps {
  value: string;
  onChange: (phone: string) => void;
  defaultCountry?: string;
  inputId?: string;
  required?: boolean;
}

export default function PhoneField({
  value,
  onChange,
  defaultCountry = "ca",
  inputId = "phone",
  required,
}: PhoneFieldProps) {
  const { inputValue, country, setCountry, handlePhoneValueChange, inputRef } = usePhoneInput({
    defaultCountry: defaultCountry as CountryIso2,
    value,
    onChange: (data) => onChange(data.phone),
  });

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const allCountries = useMemo(() => defaultCountries.map((c) => parseCountry(c)), []);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allCountries;
    const digits = q.replace(/\D/g, "");
    return allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        (digits.length > 0 && c.dialCode.includes(digits))
    );
  }, [search, allCountries]);

  // Close on outside click / Escape; focus the search box when opening.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => searchRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full rounded-xl border border-slate-200 bg-slate-50/50 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all"
    >
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Select country"
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-2 pl-3 pr-2 py-3 shrink-0 border-r border-slate-200"
        >
          <FlagImage iso2={country.iso2} size="22px" />
          <span className="text-slate-600 text-sm">+{country.dialCode}</span>
          <svg className="w-4 h-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          ref={inputRef}
          id={inputId}
          name="phone"
          type="tel"
          required={required}
          value={inputValue}
          onChange={handlePhoneValueChange}
          placeholder="Phone number"
          autoComplete="tel"
          className="w-full bg-transparent py-3 px-3 outline-none text-base text-navy-900"
        />
      </div>

      {open && (
        <div className="absolute z-50 mt-1 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl">
          <div className="p-2 border-b border-slate-100">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country or code…"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none text-sm focus:border-amber-500"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 && <li className="px-3 py-3 text-sm text-slate-400">No matches</li>}
            {filtered.map((c) => (
              <li key={`${c.iso2}-${c.dialCode}`}>
                <button
                  type="button"
                  onClick={() => {
                    setCountry(c.iso2);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-amber-50 transition-colors ${
                    c.iso2 === country.iso2 ? "bg-amber-50/70" : ""
                  }`}
                >
                  <FlagImage iso2={c.iso2} size="20px" />
                  <span className="text-sm text-navy-900 flex-1 truncate">{c.name}</span>
                  <span className="text-sm text-slate-400">+{c.dialCode}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
