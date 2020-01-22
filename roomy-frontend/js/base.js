class BasePage {
    constructor() {
        this.main = document.body
        this.navbar = null
    }

    showMain(e) {
        console.log(e)
        console.log("You're trying to show the base page")
        this.main.appendChild(this.navbar)
    }

    renderIcon(iconName, iconModifiers) {
        const span = document.createElement('span')
        span.className = `icon ${iconModifiers}`

        const i = document.createElement('i')
        i.className = `mdi ${iconName}`

        span.appendChild(i)

        return span
    }
}

const basePage = new BasePage()