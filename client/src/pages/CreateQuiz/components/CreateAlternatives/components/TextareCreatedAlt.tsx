
import { useEffect, useRef, useState } from "react";

interface IPropsTextareaCreatingAlternative {
  onChange?: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLines?: number;
  value: string;
  placeholder: string;
  autoComplete: string;
  spellCheck: boolean | undefined;
  rows: number;
  maxLength: number;
}



export default function Textarea({
    onChange,
    maxLines = 2,
    value,
    ...rest
  }: IPropsTextareaCreatingAlternative) {
    const [isValue, setIsValue] = useState("");
    const refTextarea = useRef<HTMLTextAreaElement | null>(null);
  
    const linesTextarea = (refTextarea: HTMLTextAreaElement | null) => {
      if (!refTextarea) return 0;
      const charsPerLine = Math.floor(refTextarea.clientWidth / 10);
      const linesCount = refTextarea.value
        ? Math.floor(refTextarea.value.length / charsPerLine + 1)
        : 0;
      return linesCount;
    };
  
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setIsValue(event.target.value.split("\n").filter(Boolean).join("\n"));
      if (onChange) {
        onChange(event);
      }
    };
  
    useEffect(() => {
      setIsValue(value);
    }, [value]);
  
    useEffect(() => {
      const lines = isValue.split("\n").length;
      if (lines > maxLines || linesTextarea(refTextarea.current) > maxLines) {
        setIsValue(isValue.split("\n").slice(0, maxLines).join("\n"));
      }
    }, [isValue]);
  
    return (
      <textarea
        ref={refTextarea}
        value={isValue}
        onChange={handleChange}
        {...rest}
      />
    );
  }