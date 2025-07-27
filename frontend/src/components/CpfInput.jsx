import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

function CpfInput() {
  return (
    <div id="cpf-input" className="flex flex-col gap-4">
      <Label forHTML="cpf" className="font-bold">
        CPF:
      </Label>
      <InputOTP maxLength={11} id="cpf" pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        .
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
        .
        <InputOTPGroup>
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
          <InputOTPSlot index={8} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={9} />
          <InputOTPSlot index={10} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}

export default CpfInput;
