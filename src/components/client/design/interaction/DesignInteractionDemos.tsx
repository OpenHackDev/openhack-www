"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
} from "@/components/interaction/button/BorderedButton";
import { RowLayout } from "@/components/interaction/layout/RowLayout";
import { SubHeader } from "@/components/interaction/text/Header";
import { Input } from "@/components/interaction/form/Input";
import { Slider } from "@/components/interaction/form/Slider";
import { Dropdown } from "@/components/interaction/form/Dropdown";
import { Checkbox } from "@/components/interaction/form/Checkbox";
import { Toggle } from "@/components/interaction/form/Toggle";
import Book from "@/icons/book.svg";
import Step from "@/icons/step.svg";
import Play from "@/icons/play.svg";
import { OTPInput } from "@/components/interaction/form/OTPInput";

export function DesignInteractionDemos() {
  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState("");
  const [sliderValue, setSliderValue] = useState(50);
  const [dropdownValue, setDropdownValue] = useState("python");
  const [checkA, setCheckA] = useState(false);
  const [checkB, setCheckB] = useState(true);
  const [checkC, setCheckC] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);

  useEffect(() => {
    if (otp.length === 6) alert(`OTP Entered: ${otp}`)
  }, [otp])

  return (
    <div className="flex flex-col gap-4">
      <SubHeader>interaction</SubHeader>
      <RowLayout>
        <Button
          onClick={() => {
            toast("clicked!");
          }}
        >
          Click me
        </Button>
        <IconButton
          onClick={() => {
            toast("clicked!");
          }}
          className="bg-oh-yellow text-white"
        >
          <Book />
        </IconButton>
        <IconButton
          onClick={() => {
            toast("clicked!");
          }}
          className="bg-oh-green text-white"
        >
          <Step />
        </IconButton>
        <IconButton
          onClick={() => {
            toast("clicked!");
          }}
          className="bg-oh-red text-white"
        >
          <Play />
        </IconButton>
      </RowLayout>

      <SubHeader>form elements</SubHeader>

      <div className="flex flex-col gap-3">
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="don't type banana..."
          validate={(v) =>
            v.toLowerCase().includes("banana") ? "no bananas allowed!" : null
          }
        />

        <OTPInput
          length={6}
          onChange={setOtp}
        />

        <Slider
          value={sliderValue}
          onChange={setSliderValue}
          min={0}
          max={100}
          label="volume"
        />

        <Dropdown
          value={dropdownValue}
          onChange={setDropdownValue}
          options={[
            { label: "Python", value: "python" },
            { label: "JavaScript", value: "javascript" },
            { label: "TypeScript", value: "typescript" },
            { label: "Rust", value: "rust" },
          ]}
        />

        <RowLayout>
          <Checkbox checked={checkA} onChange={setCheckA} label="option A" />
          <Checkbox checked={checkB} onChange={setCheckB} label="option B" />
          <Checkbox checked={checkC} onChange={setCheckC} label="option C" />
        </RowLayout>

        <Toggle
          checked={toggleValue}
          onChange={setToggleValue}
          label="dark mode"
        />
      </div>
    </div>
  );
}
