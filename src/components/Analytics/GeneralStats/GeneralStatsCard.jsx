import React from 'react'

const GeneralStatsCard = ({Icon, value, title, subtitle, bgColor}) => {
  return (
    <div style={{backgroundColor:bgColor}} className={`rounded-2xl shadow-xl bg-${bgColor} flex flex-col items-start justify-start p-4 gap-2`}>
      <Icon/>
      <div className="rounded-2xl hidden w-full aspect-w-1 aspect-h-1" />
      <div className="leading-8 font-semibold text-2xl">
         {value}
      </div>
      <div className="flex flex-col items-start justify-start gap-1 text-md">
        <div style={{wordWrap:"break-word"}} className="leading-6 font-medium text-gray-600">
          {title}
        </div>
        <div className="text-sm leading-4 font-medium text-[#4079ED]">
          {subtitle}
        </div>
      </div>
      
    </div>
  )
}

export default GeneralStatsCard