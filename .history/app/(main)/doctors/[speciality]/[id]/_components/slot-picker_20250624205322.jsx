import React from 'react'

const SlotPicker = ({days,onSelectSlot}) => {

  const [selectedSlot,setSelectedSlot] = useState(null);

  const firstDayWithSlots=days.find((day)=>day.slots.length>0-)
  const [activeTab, setActiveTab] = useState(firstDayWithSlots);
  
  
  return (
    <div>
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