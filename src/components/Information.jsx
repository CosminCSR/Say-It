import React, { useState, useEffect, useRef } from "react";
import Translation from "./Translation.jsx";
import Transcription from "./Transcription.jsx";

export default function Information(props) {
  const {output} = props
  console.log(output)
  const [tab, setTab] = useState("transcription")
  const [translation, setTranslation] = useState(null)
  const [translating, setTranslating] = useState(null)
  const [toLanguage, setToLanguage] = useState('Select language')

  const worker = useRef()

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url),{ type: "module" })
    }
    const onMessageReceived = async (e) => {
      switch(e.data.status) {
        case "initiate": 
          console.log("Downloading")
          break;
        case "progress": 
          console.log("Loading")
          break;
         case "update": 
          setTranslation(e.data.output)
          console.log(e.data.output)
          break;
        case "complete": 
          setTranslating(false)
          console.log("Inference Done")
          break;
      }
    }

    worker.current.addEventListener("message", onMessageReceived)
    return () => worker.current.removeEventListener("message", onMessageReceived)
  })


  const textElement = tab === 'transcription' ? output.map(val => val.text)
                                              : translation || 'No translation'


  function handleCopy() {
    navigator.clipboard.writeText(textElement)
  }
  function handleDownload() {
    const element = document.createElement('a')
    const file = new Blob([textElement], {type:'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = `SayIt_${(new Date()).toString()}.txt`
    document.body.appendChild(element)
    element.click()
  }
  function generateTranslation() {
    if (translating || toLanguage === "Select language") {
      return
    }

    setTranslating(true)

    worker.current.postMessage({
      text: output.map(val => val.text),
      src_lang: 'eng_Latn',
      tgt_lang: toLanguage
    })
  }
  

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
      {tab === "transcription" ? (<Transcription {...props} textElement = {textElement}/>) 
                               : (<Translation {...props} toLanguage={toLanguage} setToLanguage={setToLanguage} textElement={textElement} translating = {translating} setTranslating={setTranslating} setTranslation={setTranslation} generateTranslation={generateTranslation} />)}
      <div className="flex item-center gap-4 mx-auto">
        <button onClick={handleCopy} title="Copy" className="specialButton px-4 ">
          <i className="fa-solid fa-copy"></i>
        </button>
        <button onClick={handleDownload} title="Download" className="specialButton px-4 ">
        <i className="fa-solid fa-download"></i>
        </button>
      </div>
      </main>
    </div>
  )
}