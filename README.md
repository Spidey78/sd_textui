# sd_textui
A lightweight, stable, and configurable TextUI resource for FiveM / QBox servers, designed to fully replace ox_lib TextUI without UI drift, stacking bugs, or framework conflicts.

Exports

exports['SD_textui']:ShowTextUI({
    position = 'bottom', ------replace position Right, Left, Bottom.
    key = 'E', 
    title = 'title',
    description = 'text',
    color = '#22c55e'
})

-- Hide
exports['SD_textui']:HideTextUI()



===================================
FRAMEWORK OX_LIB 
==================================

for ox_lib change > ox_lib > resource > interface > client..
change all textui.lua code with this code

-- ox_lib TextUI → sd_textui compatibility layer

local isOpen = false
local currentText = nil

-- convert ox_lib positions → sd_textui positions
-- return NIL if none provided (sd_textui will fallback to its config)
local function convertPosition(pos)
    if pos == 'top-center' then return 'top' end
    if pos == 'bottom-center' then return 'bottom' end
    if pos == 'left-center' then return 'left' end
    if pos == 'right-center' then return 'right' end
    return nil
end

---@param text string
---@param options? table
function lib.showTextUI(text, options)
    if currentText == text then return end
    options = options or {}
    currentText = text
    isOpen = true
    exports['sd_textui']:ShowTextUI(text, {
        position = convertPosition(options.position)
    })
end

function lib.hideTextUI()
    exports['sd_textui']:HideTextUI()
    isOpen = false
    currentText = nil
end

---@return boolean, string | nil
function lib.isTextUIOpen()
    return isOpen, currentText
end
