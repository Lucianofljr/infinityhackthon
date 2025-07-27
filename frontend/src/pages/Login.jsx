"use client";

import { Button } from "@/components/ui/button";
// import InfinityLogoMobile from "@/assets/logo/InfinityLogoMobile.png";
// import InfinityLogoDesktop from "@/assets/logo/InfinityLogoDesktop.png"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import CpfInput from "@/components/CpfInput";

import * as React from "react";

function Login() {
  const [isopen, setIsOpen] = React.useState(false);
  const [date, setDate] = (React.useState < Date) | (undefined > undefined);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[#101010] text-white gap-4">
      <header>
        <img src={InfinityLogoMobile} alt="" />
      </header>

      <main className="flex flex-col items-center justify-center gap-4 xl:w-[600px] lg:w-1/2 md:w-[70%] rounded border-2 border-[#3F3F3F] p-8 sm:w-[80%]">
        <div id="header-form" className="flex flex-col gap-3 text-center">
          <h1 id="main-header" className="text-5xl ">
            Login Now
          </h1>
          <h3 id="sub-header" className="text-1xl opacity-35">
            Please enter your details
          </h3>
        </div>

        <form className="flex flex-col items- justify-center gap-4 w-full">
          {/* CPF */}
          <CpfInput />

          {/* Date of Birth */}
          <div id="date-input" className="flex flex-col gap-4">
            <Label forHTML="date" className="font-bold">
              Date of Birth:
            </Label>

            <Popover open={isopen} onOpenChange={setIsOpen}>

              <PopoverTrigger asChild>
                <Button variant="outline" id="date">
                  {date ? date.toLocaleDateString() : "Select Date of Birth "}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    setIsOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Remember me */}
          <section className="flex justify-between">
            <div id="remember" className="flex gap-1">
              <Input type="checkbox" id="checkbox" />
              <Label forHTML="checkbox">Remember me</Label>
            </div>

            <p>Forgot Password?</p>
          </section>

          <Button type="submit">Login</Button>
        </form>
      </main>
    </div>
  );
}

export default Login;
