import React from "react";
import { LANGUAGES } from "../utils/presets.js";

export default function Translation(props) {
  const {textElement, toLanguage, translating, setToLanguage, generateTranslation} = props
  //here we check what language the user selected to translate in and take word by word and translate it
  return(
    <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto">
      {!translating && (<>
      <div className="flex items-stretch gap-3">
        <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)} className="flex-1 border border-transparent focus:outline-none focus:ring-0 focus:border-transparent">
          <option value={'Select language'}>
            Select Language
          </option>
          {Object.entries(LANGUAGES).map(([key, value]) => {
            return(
              <option key={key} value={value}>
              {key}
            </option>
            )
          })}
        </select>
        <button onClick={generateTranslation} className="mainButton">
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