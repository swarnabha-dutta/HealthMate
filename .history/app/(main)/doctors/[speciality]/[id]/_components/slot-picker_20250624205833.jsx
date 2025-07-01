import React, { useState } from 'react'

const SlotPicker = ({days,onSelectSlot}) => {

  const [selectedSlot, setSelectedSlot] = useState(null);


  const firstDayWithSlots = days.find((day) => day.slots.;)
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
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Make changes to your account here.</TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}

export default SlotPicker