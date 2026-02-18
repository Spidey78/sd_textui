local isOpen = false

local function send(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end

-- SHOW UI
function ShowTextUI(text, opts)
    if isOpen then return end
    isOpen = true

    SendNUIMessage({
        action = 'show',
        data = {
            text = text,
            key = key,
            position = opts?.position ,
            colors = Colors,
            scale = Scale,
            animation = Animation
        }
    })
end

-- HIDE UI
function HideTextUI()
    if not isOpen then return end
    isOpen = false
    send('hide', {})
end

function IsTextUIOpen()
    return isOpen
end

-- EXPORTS
exports('ShowTextUI', ShowTextUI)
exports('HideTextUI', HideTextUI)
exports('IsTextUIOpen', IsTextUIOpen)