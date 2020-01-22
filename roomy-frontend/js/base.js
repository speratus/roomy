class BasePage {
    constructor() {
        this.main = document.body
        this.navbar = null
    }

    static clearElements(node) {
        console.log('clear elements called from', this)
        if (node !== null & node !== undefined) {
            while (node.firstChild) {
                node.firstChild.remove()
            }
        }
    }

    showMain(e) {
        BasePage.clearElements(this.main)

        this.main.appendChild(this.navbar)

        const welcomePage = new WelcomePage()
        this.main.appendChild(welcomePage.renderWelcomeView())
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