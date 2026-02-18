# SD_textui

A lightweight **TextUI resource for FiveM** with simple exports and full **ox_lib TextUI compatibility**.  
No config file required.

---

## ✨ Features

- Simple TextUI display
- Custom position (left / right / bottom)
- Custom key label
- Title + description support
- Custom color
- ox_lib TextUI compatibility layer
- No config file
- Easy to use exports

---

## 📦 Installation

1. Download or clone the resource
2. Place `SD_textui` into your `resources` folder
3. Add to `server.cfg`:

cfg
`ensure SD_textui`


🔌 Exports

Show TextUI

```
exports['SD_textui']:ShowTextUI({
    position = 'bottom', -- right | left | bottom
    key = 'E',
    title = 'Interaction',
    description = 'Press E to interact',
    color = '#22c55e'
})
```

Hide TextUI

`exports['SD_textui']:HideTextUI()`

🧩 ox_lib TextUI Compatibility

This resource can replace ox_lib TextUI internally.

Replace file:
ox_lib/resource/interface/client/textui.lua

```
--ox_lib TextUI → sd_textui compatibility layer

local isOpen = false
local currentText = nil

--convert ox_lib positions → sd_textui positions
--return NIL if none provided (sd_textui will fallback to its config)
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
```

⚠️ Notes

No config file is used

Designed for QBCore / Qbox / ESX compatibility

You can manually call SD_textui from any script

ox_lib TextUI calls will automatically redirect

📄 License

Free to use and modify for personal or community servers.

❤️ Credits

Created by SD
FiveM community
