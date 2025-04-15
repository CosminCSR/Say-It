import React from "react";
import { LANGUAGES } from "../utils/presets.js";

export default function Translation(props) {
  const {textElement, toLanguage, translating, setToLanguage, generateTranslation} = props
  return(
    <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto">
      {!translating && (<><p>
        To Language
      </p>
      <div className="flex items-stretch">
        <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)} className="flex-1 outline-non bg-white focus:outline-none border border-solid border-transparent ">
          <option value={'Select language'}>
            Select language
          </option>
          {Object.entries(LANGUAGES).map(([key, value]) => {
            return(
              <option key={key} value={value}>
              {key}
            </option>
            )
          })}
        </select>
        <button onClick={generateTranslation} className="specialButton">
          Translate
        </button>
      </div></>)}
      {(textElement && !translating) && (<p>{textElement}</p>)}
      {translating && (<div className="grid place-items-center">
        <i className="fa-solid fa-spinner animate-spin"></i>
      </div>
        )}
      
    </div>
  )
}