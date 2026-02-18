const ui = document.getElementById('textui')
const keyBox = document.getElementById('keybox')
const label = document.getElementById('label')

window.addEventListener('message', (event) => {
    const msg = event.data
    if (!msg || !msg.action) return

    if (msg.action === 'show') {
        const d = msg.data

        // CLEAN TEXT
        let text = d.text || ''
        text = text
            .replace(/\[[A-Z]\]/gi, '')
            .replace(/fa[-\w]+/gi, '')
            .replace(/building-columns/gi, '')
            .trim()

        keyBox.innerText = d.key || 'E'
        label.innerText = text

        // APPLY COLORS
        if (d.colors) {
            ui.style.background = d.colors.background
            ui.style.color = d.colors.text
            keyBox.style.background = d.colors.key
            keyBox.style.color = '#000'
        }

        // 🔥 RESET TRANSFORM COMPLETELY
        const scale = d.scale || 1
        ui.style.transform = `scale(${scale})`

        // APPLY POSITION (NO += EVER)
        applyPosition(d.position)

        ui.style.display = 'flex'
    }

    if (msg.action === 'hide') {
        ui.style.display = 'none'
    }
})

function applyPosition(pos) {
    // RESET EVERYTHING FIRST
    ui.style.top = ''
    ui.style.bottom = ''
    ui.style.left = ''
    ui.style.right = ''
    ui.style.transformOrigin = 'center'

    let translate = ''

    switch (pos) {
        case 'top':
            ui.style.top = '10%'
            ui.style.left = '50%'
            translate = 'translateX(-50%)'
            break

        case 'bottom':
        default:
            ui.style.bottom = '10%'
            ui.style.left = '50%'
            translate = 'translateX(-50%)'
            break

        case 'left':
            ui.style.left = '3%'
            ui.style.top = '50%'
            translate = 'translateY(-50%)'
            break

        case 'right':
            ui.style.right = '3%'
            ui.style.top = '50%'
            translate = 'translateY(-50%)'
            break

        case 'center':
            ui.style.left = '50%'
            ui.style.top = '50%'
            translate = 'translate(-50%, -50%)'
            break
    }

    // 🔥 COMBINE SCALE + TRANSLATE ONCE
    const currentScale = ui.style.transform.match(/scale\([^)]+\)/)?.[0] || 'scale(1)'
    ui.style.transform = `${currentScale} ${translate}`
}