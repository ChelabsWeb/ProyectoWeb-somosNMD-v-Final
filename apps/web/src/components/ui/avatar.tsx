"use client";

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-14 w-14 shrink-0 overflow-hidden rounded-none border-4 border-white shadow-[4px_4px_0_0_#000000] bg-black",
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          <Image
            src={src}
            alt={alt || "Avatar"}
            fill
            className="aspect-square h-full w-full object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#FF4D00] text-xl font-sans font-black uppercase tracking-widest text-white">
            {fallback || alt?.charAt(0) || "?"}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }
