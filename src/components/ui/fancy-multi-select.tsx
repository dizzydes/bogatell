import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"

type Framework = Record<"value" | "label", string>

export function FancyMultiSelect({
  placeholder,
  defaultLabels = [],
  onChange,
}: {
  placeholder: string;
  defaultLabels?: string[];
  onChange?: (values: string[]) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>(defaultLabels)
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = React.useCallback((label: string) => {
    setSelected((prev) => {
      const newSelected = prev.filter((s) => s !== label);
      onChange?.(newSelected);
      return newSelected;
    })
  }, [onChange])

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            const newSelected = [...selected];
            newSelected.pop();
            setSelected(newSelected);
            onChange?.(newSelected);
          }
        }
        // Add tag on Enter if there is text
        if (e.key === "Enter") {
          e.preventDefault();
          if (inputValue.trim() !== "") {
             if (!selected.includes(inputValue.trim())) {
                const newSelected = [...selected, inputValue.trim()];
                setSelected(newSelected);
                onChange?.(newSelected);
             }
             setInputValue("");
          }
        }
      }
    },
    [inputValue, selected, onChange]
  )

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >
        <div className="flex gap-1 flex-wrap">
          {selected.map((label) => (
            <Badge key={label} variant="secondary">
              {label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(label)
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => handleUnselect(label)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
    </Command>
  )
}
