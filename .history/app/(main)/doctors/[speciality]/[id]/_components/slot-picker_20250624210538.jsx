import { Tabs } from '@/components/ui/tabs';
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
        class
      >
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