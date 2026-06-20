"use client";

import { DatePicker } from "@heroui/date-picker";
import { Select, SelectItem } from "@heroui/select";
import {
  type DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";

interface SchedulePickersProps {
  scheduleHeading: string;
  preferredDateLabel: string;
  preferredTimeLabel: string;
  preferredTimePlaceholder: string;
  preferredDate: string;
  preferredTime: string;
  embedded?: boolean;
  onPreferredDateChange: (value: string) => void;
  onPreferredTimeChange: (value: string) => void;
}

const TIME_SLOTS = Array.from({ length: 12 }, (_, index) => {
  const hour = index + 8;

  return [0, 30].map((minute) => {
    const value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    const label = `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;

    return { value, label };
  });
}).flat();

function stringToDate(value: string): DateValue | null {
  if (!value) return null;

  try {
    return parseDate(value);
  } catch {
    return null;
  }
}

function dateToString(value: DateValue | null): string {
  return value?.toString() ?? "";
}

export function SchedulePickers({
  scheduleHeading,
  preferredDateLabel,
  preferredTimeLabel,
  preferredTimePlaceholder,
  preferredDate,
  preferredTime,
  embedded = false,
  onPreferredDateChange,
  onPreferredTimeChange,
}: SchedulePickersProps) {
  const minDate = today(getLocalTimeZone());

  const fields = (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <DatePicker
        classNames={{
          base: "w-full",
          inputWrapper:
            "min-h-12 bg-white border-gray-200 shadow-sm group-data-[focus=true]:border-violet-500",
          label: "text-gray-600 font-medium",
        }}
        label={preferredDateLabel}
        minValue={minDate}
        size="md"
        value={stringToDate(preferredDate)}
        variant="bordered"
        onChange={(date) => onPreferredDateChange(dateToString(date))}
      />
      <Select
        classNames={{
          trigger:
            "min-h-12 bg-white border-gray-200 shadow-sm data-[focus=true]:border-violet-500",
          label: "text-gray-600 font-medium",
        }}
        label={preferredTimeLabel}
        placeholder={preferredTimePlaceholder}
        popoverProps={{
          placement: "bottom",
          classNames: { content: "max-h-60 overflow-y-auto" },
        }}
        selectedKeys={preferredTime ? [preferredTime] : []}
        size="md"
        variant="bordered"
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0];

          onPreferredTimeChange(
            typeof selected === "string" ? selected : "",
          );
        }}
      >
        {TIME_SLOTS.map((slot) => (
          <SelectItem key={slot.value}>{slot.label}</SelectItem>
        ))}
      </Select>
    </div>
  );

  if (embedded) {
    return fields;
  }

  return (
    <div className="flex w-full flex-col gap-3.5 rounded-2xl border border-gray-100 bg-gray-50/70 p-3.5 sm:p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-violet-600">
        {scheduleHeading}
      </p>
      {fields}
    </div>
  );
}
