AddEventHandler("np-inventory:itemUsed", function(item, info)
    if item ~= "karambitcase" then return end
    if not exports["np-inventory"]:hasEnoughOfItem("karambitcase", 1, false, true) then -- This For Checking If U Have That Item Or Not
      -- Trigger Your Alert Notify For Information Player Dont Have Item
      return
    end
    TriggerEvent('inventory:removeItem', 'karambitcase', 1)
    SetNuiFocus(true, true)
    SendNUIMessage({show = true})
    TriggerScreenblurFadeIn(300.0)
  end)

RegisterNUICallback('caseResult', function(data)
    SetNuiFocus(false, false)
    SendNUIMessage({show = false})
    TriggerScreenblurFadeOut(300.0)
    TriggerEvent('notification', 'You won '..data.itemname..'!', 0)
    TriggerEvent("player:receiveItem", data.itemid, 1)
end)

RegisterNUICallback('CloseUIForce', function()
    SetNuiFocus(false, false)
    SendNUIMessage({show = false})
    TriggerScreenblurFadeOut(300.0)
end)