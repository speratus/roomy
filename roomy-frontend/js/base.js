class BasePage {
    constructor() {
        this.main = document.body
        this.navbar = null
    }

    static clearElements(node) {
        if (node !== null & node !== undefined) {
            while (node.firstChild) {
                node.firstChild.remove()
            }
        }
    }

    showMain(e) {
        console.log(e)
        console.log("You're trying to show the base page")
        this.main.appendChild(this.navbar)

        this.renderWelcomeView()
    }

    renderIcon(iconName, iconModifiers) {
        const span = document.createElement('span')
        span.className = `icon ${iconModifiers}`

        const i = document.createElement('i')
        i.className = `mdi ${iconName}`

        span.appendChild(i)

        return span
    }

    renderFullPageBanner(mainText, contents) {
        BasePage.clearElements(this.main.querySelector('#main-content'))
        const main = document.createElement('main')
        main.id = 'main-content'

        const bannerSection = document.createElement('section')
        bannerSection.className = 'hero is-primary is-fullheight'

        const bannerBody = document.createElement('hero-body')
        bannerBody.className = 'hero-body'

        const centerer = document.createElement('div')
        centerer.className = 'container has-text-centered'

        const title = document.createElement('h1')
        title.className = 'title'
        title.textContent = mainText

        centerer.appendChild(title)
        centerer.appendChild(contents) //used to be centerer.apc(buttonLevel)
        bannerBody.appendChild(centerer)
        bannerSection.appendChild(bannerBody)
        main.appendChild(bannerSection)

        this.main.appendChild(main)

    }

    renderWelcomeView() {
        const buttonLevel = document.createElement('div')
        buttonLevel.className = 'level'

        const buttonArea = document.createElement('div')
        buttonArea.className = 'buttons are-medium level-item'

        const loginButton = document.createElement('button')
        loginButton.className = 'button is-link'
        loginButton.textContent = 'Login'

        const signupButton = document.createElement('button')
        signupButton.className = 'button is-link'
        signupButton.textContent = 'Signup'

        buttonArea.appendChild(loginButton)
        buttonArea.appendChild(signupButton)

        buttonLevel.appendChild(buttonArea)

        this.renderFullPageBanner('Welcome to Roomy', buttonLevel)
    }

    
}

const basePage = new BasePage()