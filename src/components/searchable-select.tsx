import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { useId } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;

  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange?: (value: string) => void;

  className?: string;
  popoverClassName?: string;
}

export default function SearchableSelect({
  options,
  value,

  label,
  placeholder = "Select an option",
  searchPlaceholder = "Search options...",
  emptyMessage = "No options found.",

  open = false,
  onOpenChange,
  onChange,

  className,
  popoverClassName,
}: SearchableSelectProps) {
  const id = useId();

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (currentValue: string) => {
    onChange?.(currentValue === value ? "" : currentValue);
    onOpenChange?.(false);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {selectedOption?.label || placeholder}
            </span>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0",
            popoverClassName
          )}
          align="start"
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                  >
                    {option.label}
                    {value === option.value && (
                      <Check size={16} strokeWidth={2} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
