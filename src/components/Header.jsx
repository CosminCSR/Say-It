import React from "react";


//planing to add a login here
export default function Header() {
  return(
    //default header 
    <header className='flex items-center justify-between p-4 w-full ml-0'>
      <a href="/" className="block p-2 rounded-md hover:bg-emerald-100 transition mainButton">
        <h1 className="font-medium">Say<span className="text-emerald-700 bold">It</span></h1>
      </a>
    </header>
  )
}