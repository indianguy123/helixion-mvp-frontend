"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Calendar, Upload, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import InputField, { Label } from "../ui/input";
import Badge from "../ui/badge";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StayOption {
  id: string;
  label: string;
  price: string;
}

interface StayType {
  id: string;
  label: string;
  enabled: boolean;
  options: StayOption[];
}

interface FormData {
  programTitle: string;
  startDate: string;
  endDate: string;
  venue: string;
  stayTypes: StayType[];
  brochureFile: File | null;
  minParticipants: string;
  maxParticipants: string;
}



interface StayOptionRowProps {
  option: StayOption;
  parentEnabled: boolean;
  onPriceChange: (id: string, price: string) => void;
}

function StayOptionRow({ option, parentEnabled, onPriceChange }: StayOptionRowProps) {
  return (
    <div className="grid grid-cols-[160px_1fr] items-center gap-x-4 pl-6">
      <div className="flex items-center gap-2">
        <Checkbox
          id={option.id}
          checked={parentEnabled}
          disabled={!parentEnabled}
          className="border-borderDark data-[state=checked]:bg-primary data-[state=checked]:border-primary w-3.5 h-3.5"
        />
        <label htmlFor={option.id} className="text-sm text-textSecondary cursor-pointer select-none">
          {option.label}
        </label>
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textSidebarMuted text-sm">₹</span>
        <InputField
          type="text"
          value={option.price}
          onChange={(e) => onPriceChange(option.id, e.target.value)}
          disabled={!parentEnabled}
          className="bg-inputBg border-borderDark text-textSecondary pl-7 h-9 text-sm disabled:opacity-40"
        />
      </div>
    </div>
  );
}

// ─── Live Preview ─────────────────────────────────────────────────────────────

interface LivePreviewProps {
  data: FormData;
}

function LivePreview({ data }: LivePreviewProps) {
  const enabledStays = data.stayTypes.filter((s) => s.enabled);

  return (
    <div className="bg-bgCard border border-borderCard rounded-lg p-5 h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-textSidebarMuted uppercase tracking-wider mb-0.5">Live preview</p>
          <p className="text-xs text-textMuted">How participants will see this program</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="text-xs h-7 px-3 border-borderDark text-textSecondary hover:bg-bgButton"
        >
          Preview
        </Button>
      </div>

      <Separator className="bg-borderDark" />

      {/* Preview Card */}
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground leading-tight">
            {data.programTitle || "Program title appears here"}
          </h3>
          <p className="text-sm text-textSidebarMuted mt-0.5">
            {data.venue ? `Venue — ${ data.venue }` : "Venue — not set"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-textSidebarMuted mb-1">Starts</p>
            <p className="text-sm text-textSecondary">{data.startDate || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-textSidebarMuted mb-1">Ends</p>
            <p className="text-sm text-textSecondary">{data.endDate || "—"}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-textSidebarMuted mb-1">Capacity</p>
          <p className="text-sm text-textSecondary">
            {data.minParticipants || data.maxParticipants
              ? `${ data.minParticipants || "?" } / ${ data.maxParticipants || "?" }`
              : "— / —"}
          </p>
        </div>

        {enabledStays.length > 0 && (
          <div>
            <p className="text-xs text-textSidebarMuted mb-2">Fees</p>
            <div className="space-y-2">
              {enabledStays.map((stay) =>
                stay.options.map((opt) => (
                  <div key={opt.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-textSidebarMuted">{stay.label}</p>
                      <p className="text-sm text-textSecondary">{opt.label}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {opt.price && (
                        <span className="text-sm text-textSecondary">₹{opt.price}</span>
                      )}
                      <ArrowLeftRight className="w-3.5 h-3.5 text-textSidebarMuted" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {enabledStays.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {enabledStays.map((stay) => (
              <Badge
                key={stay.id}
                variant="secondary"
                className="bg-bgStatCard text-textSecondary border border-borderDark text-xs"
              >
                {stay.label}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const DEFAULT_STAY_TYPES: StayType[] = [
  {
    id: "residential",
    label: "Residential",
    enabled: false,
    options: [
      { id: "single", label: "Single Occupancy", price: "" },
      { id: "twin", label: "Twin Sharing", price: "" },
    ],
  },
  {
    id: "non-residential",
    label: "Non-Residential",
    enabled: false,
    options: [{ id: "non-res-default", label: "Day Scholar", price: "" }],
  },
];

export default function CreateTrainingProgram() {
  const [form, setForm] = useState<FormData>({
    programTitle: "",
    startDate: "",
    endDate: "",
    venue: "",
    stayTypes: DEFAULT_STAY_TYPES,
    brochureFile: null,
    minParticipants: "",
    maxParticipants: "",
  });

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleStayType = (stayId: string) => {
    setForm((prev) => ({
      ...prev,
      stayTypes: prev.stayTypes.map((s) =>
        s.id === stayId ? { ...s, enabled: !s.enabled } : s
      ),
    }));
  };

  const updateOptionPrice = (stayId: string, optionId: string, price: string) => {
    setForm((prev) => ({
      ...prev,
      stayTypes: prev.stayTypes.map((s) =>
        s.id === stayId
          ? {
            ...s,
            options: s.options.map((o) => (o.id === optionId ? { ...o, price } : o)),
          }
          : s
      ),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleField("brochureFile", file);
  };

  const handleSaveDraft = () => {
    console.log("Save draft:", form);
  };

  const handlePublish = () => {
    console.log("Publish:", form);
  };

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-bgMain px-6 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Create new training program</h1>
        <p className="text-sm text-textSidebarMuted mt-0.5">
          Publish a single program to the Helixon marketplace.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        {/* ── Left: Form ─────────────────────────────────────────────────────── */}
        <div className="bg-bgCard border border-borderCard rounded-lg p-6 space-y-5">
          {/* Section label */}
          <div>
            <p className="text-xs font-medium text-textSecondary mb-0.5">Program details</p>
            <p className="text-xs text-textSidebarMuted">All fields are required unless marked optional.</p>
          </div>

          <Separator className="bg-borderDark" />

          {/* Program Title */}
          <div className="grid grid-cols-[160px_1fr] items-start gap-4">
            <Label className="pt-2 text-sm text-textMuted">
              Program title
            </Label>

            <InputField
              value={form.programTitle}
              onChange={(e) => handleField("programTitle", e.target.value)}
              placeholder="e.g. Accounting and Auditing Principles"
              className="bg-inputBg border-borderDark text-textSecondary h-9 text-sm"
            />
          </div>

          {/* Program Dates */}
          <div className="grid grid-cols-[160px_1fr] gap-4 items-start">
            <div className="pt-2">
              <Label className="text-sm text-textMuted">
                Program dates
              </Label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <InputField
                type="date"
                value={form.startDate}
                onChange={(e) => handleField("startDate", e.target.value)}
                className="bg-inputBg border-borderDark text-textSecondary h-9 text-sm"
              />

              <InputField
                type="date"
                value={form.endDate}
                onChange={(e) => handleField("endDate", e.target.value)}
                className="bg-inputBg border-borderDark text-textSecondary h-9 text-sm"
              />
            </div>
          </div>


          {/* Venue */}
          <div className="grid grid-cols-[160px_1fr] gap-4 items-start">
            <div className="pt-2">
              <Label className="text-sm text-textMuted">
                Venue
              </Label>
            </div>

            <InputField
              value={form.venue}
              onChange={(e) => handleField("venue", e.target.value)}
              placeholder="e.g. Hotel Ritz, Kolkata"
              className="bg-inputBg border-borderDark text-textSecondary h-9 text-sm"
            />
          </div>

          <div className="grid grid-cols-[160px_1fr] gap-4 items-start">
            {/* Left Label */}
            <div className="pt-2">
              <Label className="text-sm text-textMuted">
                Stay type
              </Label>

              <p className="text-xs text-textSidebarMuted mt-0.5">
                Program fee
              </p>
            </div>

            {/* Right Content */}
            <div className="space-y-3">
              {form.stayTypes.map((stay) => (
                <div key={stay.id} className="space-y-2">
                  {/* Parent stay type row */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={stay.id}
                      checked={stay.enabled}
                      onCheckedChange={() => toggleStayType(stay.id)}
                      className="border-borderDark data-[state=checked]:bg-primary data-[state=checked]:border-primary w-3.5 h-3.5"
                    />

                    <label
                      htmlFor={stay.id}
                      className="text-sm text-textSecondary font-medium cursor-pointer select-none"
                    >
                      {stay.label}
                    </label>
                  </div>

                  {/* Sub-options */}
                  {stay.enabled && (
                    <div className="space-y-2 pl-2">
                      {stay.options.map((opt) => (
                        <StayOptionRow
                          key={opt.id}
                          option={opt}
                          parentEnabled={stay.enabled}
                          onPriceChange={(optId, price) =>
                            updateOptionPrice(stay.id, optId, price)
                          }
                        />
                      ))}
                    </div>
                  )}

                  {/* Non-residential disabled state */}
                  {!stay.enabled && stay.id === "non-residential" && (
                    <div className="grid grid-cols-[160px_1fr] items-center gap-x-4 pl-6 opacity-40">
                      <div />

                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textSidebarMuted text-sm">
                          ₹
                        </span>

                        <InputField
                          disabled
                          className="bg-inputBg border-borderDark text-textSecondary pl-7 h-9 text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Attach Brochure */}
          <div className="grid grid-cols-[160px_1fr] gap-4 items-start">
            {/* Left Label */}
            <div className="pt-2">
              <Label className="text-sm text-textMuted">
                Attach brochure
              </Label>
            </div>

            {/* Right Content */}
            <div>
              <label
                htmlFor="brochure-upload"
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-borderDark",
                  "bg-bgButton hover:bg-bgButtonHover text-textSecondary text-sm cursor-pointer transition-colors"
                )}
              >
                <Upload className="w-3.5 h-3.5" />
                Browse
              </label>

              <input
                id="brochure-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

              {form.brochureFile && (
                <p className="text-xs text-textMuted mt-1.5">
                  {form.brochureFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Min / Max Participants */}
          {/* Minimum Participants */}
          <div className="grid grid-cols-[160px_1fr] gap-4 items-start">
            <div className="pt-2">
              <Label className="text-sm text-textMuted">
                Minimum participants
              </Label>
            </div>

            <InputField
              type="number"
              value={form.minParticipants}
              onChange={(e) => handleField("minParticipants", e.target.value)}
              className="bg-inputBg border-borderDark text-textSecondary h-9 text-sm w-40"
            />
          </div>

          {/* Maximum Participants */}
          <div className="grid grid-cols-[160px_1fr] gap-4 items-start">
            <div className="pt-2">
              <Label className="text-sm text-textMuted">
                Maximum participants
              </Label>
            </div>

            <InputField
              type="number"
              value={form.maxParticipants}
              onChange={(e) => handleField("maxParticipants", e.target.value)}
              className="bg-inputBg border-borderDark text-textSecondary h-9 text-sm w-40"
            />
          </div>

          <Separator className="bg-borderDark" />

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              className="border-borderDark text-textSecondary hover:bg-bgButton hover:text-foreground h-9 px-4 text-sm"
            >
              Save draft
            </Button>
            <Button
              onClick={handlePublish}
              className="bg-primary hover:bg-primaryDark text-white h-9 px-4 text-sm"
            >
              Publish program
            </Button>
          </div>
        </div>

        {/* ── Right: Live Preview ─────────────────────────────────────────────── */}
        <LivePreview data={form} />
      </div>
    </div>
  );
}