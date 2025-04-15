import React, { useState } from "react";
import Translation from "./Translation.jsx";
import Transcription from "./Transcription.jsx";

export default function Information() {
  const [tab, setTab] = useState("transcription")

  return(
    <div>
      <main className = "flex-1 p-4 flex flex-col gap-3 sm:gap-4 md: gap-5 justify-center text-center pb-20 w-fit max-w-full mx-auto w-72">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-5xl">
        Your
        <span className="text-emerald-700 bold">Transcription</span>
      </h1>
      <div className="grid grid-cols-2 mx-auto bg-white border-solid border-blue shadow rounded-full overflow-hidden items-center">
        <button onClick={() => setTab("transcription")} className={"px-4 duration-200 py-1 font-medium " + (tab === "transcription" ? "bg-emerald-400 text-white" 
                                                                               : "text-emerald-400 hover:text-emerald-600")}>
          Transcription
        </button>
        <button onClick={() => setTab("translation")} className={"px-4 duration-200 py-1 font-medium " + (tab === "translation" ? "bg-emerald-400 text-white" 
                                                                             : "text-emerald-400 hover:text-emerald-600")}>
          Translation
        </button>
      </div>
      {tab === "transcription" ? (<Transcription />) 
                               : (<Translation />)}
      </main>
    </div>
  )
}