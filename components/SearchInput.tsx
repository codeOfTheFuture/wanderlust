import React from "react"

const SearchInput: React.FC = () => {
  return (
    <div className="absolute -bottom-[2.4rem] flex w-11/12 md:w-full h-16 sm:h-20">
      <input type="text" className="relative w-full h-full px-20 text-lg border border-black" />
      <button className="absolute top-2 right-2 w-28 h-12 sm:w-32 sm:h-16 bg-[#4285F4] text-white text-lg border border-black">Search</button>
    </div>
  )
}

export default SearchInput