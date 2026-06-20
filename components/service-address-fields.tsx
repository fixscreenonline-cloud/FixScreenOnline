"use client";

import { Input } from "@heroui/input";

interface ServiceAddressFieldsProps {
  streetAddress: string;
  city: string;
  zip: string;
  streetAddressLabel: string;
  streetAddressPlaceholder: string;
  cityLabel: string;
  cityPlaceholder: string;
  zipLabel: string;
  zipPlaceholder: string;
  errors?: {
    streetAddress?: string;
    city?: string;
    zip?: string;
  };
  onStreetAddressChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onZipChange: (value: string) => void;
}

const inputClassNames = {
  inputWrapper:
    "min-h-12 bg-white border-gray-200 shadow-sm group-data-[focus=true]:border-violet-500",
  label: "text-gray-600 font-medium",
};

export function ServiceAddressFields({
  streetAddress,
  city,
  zip,
  streetAddressLabel,
  streetAddressPlaceholder,
  cityLabel,
  cityPlaceholder,
  zipLabel,
  zipPlaceholder,
  errors,
  onStreetAddressChange,
  onCityChange,
  onZipChange,
}: ServiceAddressFieldsProps) {
  return (
    <div className="flex flex-col gap-3">
      <Input
        required
        classNames={inputClassNames}
        errorMessage={errors?.streetAddress}
        isInvalid={Boolean(errors?.streetAddress)}
        label={streetAddressLabel}
        placeholder={streetAddressPlaceholder}
        size="md"
        value={streetAddress}
        variant="bordered"
        onChange={(e) => onStreetAddressChange(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          required
          classNames={inputClassNames}
          errorMessage={errors?.city}
          isInvalid={Boolean(errors?.city)}
          label={cityLabel}
          placeholder={cityPlaceholder}
          size="md"
          value={city}
          variant="bordered"
          onChange={(e) => onCityChange(e.target.value)}
        />
        <Input
          required
          classNames={inputClassNames}
          errorMessage={errors?.zip}
          inputMode="numeric"
          isInvalid={Boolean(errors?.zip)}
          label={zipLabel}
          maxLength={5}
          placeholder={zipPlaceholder}
          size="md"
          value={zip}
          variant="bordered"
          onChange={(e) => onZipChange(e.target.value)}
        />
      </div>
    </div>
  );
}
