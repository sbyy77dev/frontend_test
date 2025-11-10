"use client"

import * as React from "react"
// 1. OTPInputContext를 올바르게 임포트합니다.
import { OTPInput, OTPInputContext, useSlot } from "input-otp"
import { Dot } from "lucide-react" // 2. 마스킹을 위한 Dot 아이콘 임포트

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

// 3. 버그의 원인이었던 Context 재정의 라인을 삭제했습니다.

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  // 4. 올바르게 임포트된 OTPInputContext를 사용합니다.
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = useSlot(index)

  // 5. 오류 방지를 위해 Context가 있는지 확인합니다.
  if (!inputOTPContext) {
    throw new Error("InputOTPSlot must be used within an InputOTP")
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {/* 6. 마스킹 로직을 여기에 직접 구현합니다. */}
      {char ? (
        // 문자가 있고, 활성화(포커스) 상태가 아니면 Dot(•)을 보여줍니다.
        <div>{isActive ? char : <Dot className="h-4 w-4" />}</div>
      ) : (
        // 문자가 없으면 캐럿(커서)을 표시합니다.
        <>
          {hasFakeCaret && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
            </div>
          )}
        </>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }