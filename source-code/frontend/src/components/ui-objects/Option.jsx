import * as React from "react"
import { useState } from "react"
import { IoIosUndo } from "react-icons/io";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Option({ selectedValue, setSelectedValue }) {
  const handleChange = (value) => {
    if (value === "reset") {
      setSelectedValue(""); 
    } else {
      setSelectedValue(value);
    }
  };

  if (selectedValue && selectedValue === "reset") {
    return null;
  }
  
  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className="select w-[800px] border-[#181818] px-[10px] py-[20px] cursor-pointer">
        <SelectValue placeholder="Select an Application" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Applications</SelectLabel>
          <SelectItem className="cursor-pointer" value="instagram">Instagram</SelectItem>
          <SelectItem className="cursor-pointer" value="facebook">Facebook</SelectItem>
          <SelectItem className="cursor-pointer" value="youtube">Youtube</SelectItem>
          <SelectItem className="cursor-pointer" value="X (twitter)">X (formerly Twitter)</SelectItem>
          <SelectItem className="cursor-pointer" value="other">Other</SelectItem>
          {selectedValue && (
            <SelectItem className="instructions text-muted-foreground text-[18px] cursor-pointer" value="reset"><IoIosUndo /> Undo</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
