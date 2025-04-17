import React from 'react'

const AuthImagePattern = () => {
 const squares = Array.from({ length: 9 }, (_, i) => i + 1);

 return (
   <div className="grid grid-cols-3 gap-4 p-4">
     {squares.map((num) => (
       <div
         key={num}
         className={`w-24 h-24 rounded-lg bg-[#d08e17] relative flex items-center justify-center 
            ${num % 2 !== 0 ? "animate-pulse duration-1000" : ""}
          `}></div>
     ))}
   </div>
 );
}

export default AuthImagePattern