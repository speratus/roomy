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

    static clearMainContents() {
        const content = document.querySelector('#main-content')
        if (content !== null) {
            content.remove()
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
        console.log('called from ', this)
        BasePage.clearMainContents()
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

    renderLoginForm() {
        const loginForm = document.createElement('form')

        const inputWrapper = document.createElement('div')
        inputWrapper.className = 'field'

        const input = document.createElement('input')
        input.type = 'text'
        input.placeholder = 'Username'
        input.className = 'input is-rounded'

        const buttonWrapper = document.createElement('div')
        buttonWrapper.className = 'field'

        const loginButton = document.createElement('button')
        loginButton.className = 'button is-link is-medium'
        loginButton.textContent = 'Login'
        
        inputWrapper.appendChild(input)
        buttonWrapper.appendChild(loginButton)

        loginForm.appendChild(inputWrapper)
        loginForm.appendChild(buttonWrapper)
        return loginForm
    }

    renderWelcomeView() {
        const buttonLevel = document.createElement('div')
        buttonLevel.className = 'level'

        const buttonArea = document.createElement('div')
        buttonArea.className = 'buttons are-medium level-item'

        const loginButton = document.createElement('button')
        loginButton.className = 'button is-link'
        loginButton.textContent = 'Login'
        loginButton.addEventListener('click', e => {
            this.renderFullPageBanner('Please Enter your Username to Login', this.renderLoginForm())
        })

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