"use client";



import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import React, { useState } from 'react'

const SlotPicker = ({days,onSelectSlot}) => {

  const [selectedSlot, setSelectedSlot] = useState(null);


  const firstDayWithSlots = days.find((day) => day.slots.length > 0)?.date || days[0]?.date;


  const [activeTab, setActiveTab] = useState(firstDayWithSlots);
  
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const confirmSelection = () => {
    if (selectedSlot) {
      onSelectSlot(selectedSlot);
    }
  }
  
  return (
    <div className='space-y-6'>
      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
          <TabsList>
            {days.map((day)=>{
              
              return (
                <TabsTrigger
                  key={day.date}
                  value={day.date}
                  disabled={day.slots.length === 0}
                  className={
                    day.slots.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }
                >
                  <div className='flex gap-2'>
                    <div className='opacity-80'>
                    {format(new Date(day.date),"MMM d")}
                    </div>
                    <div>({format(new Date(day.date),"EEE")})</div>
                  </div>

                  {day.slots.length > 0 && (
                    <div className="bg-emerald-900/30 text-emerald-400 ">

                    </div>
                  ) }
                </TabsTrigger>
              );  
          })};
            
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}

export default SlotPicker