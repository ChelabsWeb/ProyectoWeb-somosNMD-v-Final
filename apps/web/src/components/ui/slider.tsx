import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, ...props }, ref) => {
    return (
      <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          className="w-full h-4 bg-black border-2 border-white rounded-none appearance-none cursor-pointer focus:outline-none
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:bg-[#FF4D00] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[4px_4px_0_0_#000000] [&::-webkit-slider-thumb]:active:translate-y-[4px] [&::-webkit-slider-thumb]:active:translate-x-[4px] [&::-webkit-slider-thumb]:active:shadow-none
            [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:h-10 [&::-moz-range-thumb]:bg-[#FF4D00] [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-[4px_4px_0_0_#000000] [&::-moz-range-thumb]:active:translate-y-[4px] [&::-moz-range-thumb]:active:translate-x-[4px] [&::-moz-range-thumb]:active:shadow-none"
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
