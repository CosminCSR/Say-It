import React from "react";

export default function FileDisplay(props) {
  const {handleAudioReset, file, audioStream, handleFormSubmission} = props

  return(
    <div>
      <main className = "flex-1 p-4 flex flex-col gap-3 sm:gap-4 md: gap-5 justify-center text-center pb-20 w-fit max-w-full mx-auto w-72">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your
        <span className="text-emerald-700 bold">File</span>
      </h1>
      <div className="flex flex-col text-left my-4">
        <h3 className="font-semibold">
          Name
        </h3> 
        <p>{file ? file.name : "Custom audio"}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button onClick = {handleAudioReset} className="text-slate-400 hover:text-emerald-700 duration-200">
          Back To Main Page
        </button>
        <button type="button" onClick={handleFormSubmission} className="specialButton p-2 rounded-lg text-emerald-700 flex items-center gap-2 font-medium">
          <p>Transcribe</p>
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
      </main>
    </div>
  )
}