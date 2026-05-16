import { Checkbox } from "@/components/ui/checkbox";
import InputField from "@/components/ui/input";
import { StayOption } from "@/types";

interface StayOptionRowProps {
  option: StayOption;
  parentEnabled: boolean;
  onPriceChange: (id: string, price: string) => void;
}

//select price option shown like (residential - single and twin sharing , non-residential)

export default function StayOptionRow({ option, parentEnabled, onPriceChange }: StayOptionRowProps) {
  return (
    <div className="grid grid-cols-[160px_1fr] items-center gap-x-4 pl-6">
      <div className="flex items-center gap-2">
        <Checkbox
          id={option.id}
          checked={!!option.price}
          disabled
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