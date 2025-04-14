import React from "react";

export default function Header() {
  return(
    <header className='flex items-center justify-between gap-4 p-4'>
      <h1 className="font-medium">Say<span className="text-emerald-700 bold">It</span></h1>
      <button className = "flex items-center gap-2 specialButton px-4 py-2 rounded-lg text-emerald-700">
         <p>
          New
        </p>
        <i className="fa-duotone fa-solid fa-plus"></i>
      </button>
    </header>
  )
}