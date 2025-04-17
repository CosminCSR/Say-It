import React from "react";

export default function FileDisplay(props) {
  const {handleAudioReset, file, audioStream, handleFormSubmission} = props

  //page to see if your file was a custom one that the user recorder, or uploaded a .mp3 file
  return(
    <div>
      <main className = "flex-1 p-4 flex flex-col sm:gap-4 md: gap-5 justify-center pt-50 text-center max-w-[600px] mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your
        <span className="text-emerald-700 bold">File</span>
      </h1>
      <div className="flex flex-col text-left my-4">
        <h3 className="font-semibold">
          Name
        </h3> 
        <p>{file ? file.name : "Your audio"}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button onClick = {handleAudioReset} className="text-slate-500 hover:text-emerald-700 duration-200 cursor-pointer">
          Back To Main Page
        </button>
        <button type="button" onClick={handleFormSubmission} className="mainButton p-2 rounded-lg text-emerald-700 flex items-center gap-2 font-medium">
          <p>Transcribe</p>
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
      </main>
    </div>
  )
}