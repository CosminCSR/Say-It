import React from "react";

export default function Transcribing(props) {
  const { downloading } = props

  //a page that only shows while transcribing the recording with an animation
  return (
    <div className="flex items-center flex-1 flex-col justify-center gap-10 md:gap-14 pb-70">
      <div className="flex items-center flex-col gap-2 sm:gap-4">
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
          <span className="text-emerald-700 bold">Transcribing</span>
        </h1>
        <div className="flex items-center gap-3">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-3 h-3 bg-emerald-700 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

    </div>
  )
}