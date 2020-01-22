class WelcomePage {
    constructor() {
        this.content = document.createElement('main')
        this.content.id = 'main-content'
    }

    renderFullPageBanner(mainText, contents) {
        console.log('called from ', this)
        BasePage.clearElements(this.content)

        const bannerSection = document.createElement('section')
        bannerSection.className = 'hero is-primary is-fullheight'

        const bannerBody = document.createElement('hero-body')
        bannerBody.className = 'hero-body'

        const centerer = document.createElement('div')
        centerer.className = 'container has-text-centered'

        const title = document.createElement('h1')
        title.className = 'title is-size-1'
        title.textContent = mainText

        console.log(contents)

        centerer.appendChild(title)
        centerer.appendChild(contents) //used to be centerer.apc(buttonLevel)
        bannerBody.appendChild(centerer)
        bannerSection.appendChild(bannerBody)
        this.content.appendChild(bannerSection)

        return this.content
    }

    renderLoginForm() {
        const loginForm = document.createElement('form')

        const inputWrapper = document.createElement('div')
        inputWrapper.className = 'field'

        const input = document.createElement('input')
        input.type = 'text'
        input.placeholder = 'Username'
        input.className = 'input is-rounded is-primary'

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


        this.content = this.renderFullPageBanner('Welcome to Roomy', buttonLevel)

        return this.content
    }
}