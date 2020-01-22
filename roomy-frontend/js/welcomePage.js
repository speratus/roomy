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

    executeLogin(e) {
        e.preventDefault()

        const username = e.target['username'].value

        fetch('http://localhost:3000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username
            })
        }).then(res => res.json()).then(console.log)
    }

    executeSingup(e) {
        e.preventDefault()
        const name = e.target['name'].value
        const username = e.target['username'].value
        const userType = e.target['user-type'].value

        const user = {
            name: name,
            username: username,
            "user_type": userType
        }
        console.log(user)

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user: user
            })
        }).then(res => res.json()).then(console.log)
    }

    renderLoginForm() {
        const loginForm = document.createElement('form')

        const inputWrapper = document.createElement('div')
        inputWrapper.className = 'field'

        const input = document.createElement('input')
        input.type = 'text'
        input.name = 'username'
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

        loginForm.addEventListener('submit', this.executeLogin)
        return loginForm
    }

    renderSignupForm() {
        const form = document.createElement('form')

        //Create elements relating to the Name text field
        const nameField = document.createElement('div')
        nameField.className = 'field'
        
        const nameLabel = document.createElement('label')
        nameLabel.className = 'label'
        nameLabel.textContent = 'Name'

        const nameControl = document.createElement('div')
        nameControl.className = 'control'

        const nameInput = document.createElement('input')
        nameInput.type = 'text'
        nameInput.name = 'name'
        nameInput.className = 'input is-rounded is-primary'

        nameControl.appendChild(nameInput)

        nameField.appendChild(nameLabel)
        nameField.appendChild(nameControl)

        //Create elements relating to the username text field
        const userNameField = document.createElement('div')
        userNameField.className = 'field'

        const userNameLabel = document.createElement('label')
        userNameLabel.className = 'label'
        userNameLabel.textContent = 'Username'

        const userNameControl = document.createElement('div')
        userNameControl.className = 'control'

        const userNameInput = document.createElement('input')
        userNameInput.type = 'text'
        userNameInput.name = 'username'
        userNameInput.className = 'input is-rounded is-primary'

        userNameControl.appendChild(userNameInput)

        userNameField.appendChild(userNameLabel)
        userNameField.appendChild(userNameControl)

        //Create elements relating to the type radio buttons
        const typeField = document.createElement('div')
        typeField.className = 'field'

        const typeControl = document.createElement('div')
        typeControl.className = 'control'

        const seekerTypeLabel = document.createElement('label')
        seekerTypeLabel.className = 'radio'

        const seekerTypeInput = document.createElement('input')
        seekerTypeInput.type = 'radio'
        seekerTypeInput.name = 'user-type'
        seekerTypeInput.value = 'RoomSeeker'

        seekerTypeLabel.appendChild(seekerTypeInput)
        seekerTypeLabel.append('I am looking for someone to room with')

        const hostTypeLabel = document.createElement('label')
        hostTypeLabel.className = 'radio'

        const hostTypeInput = document.createElement('input')
        hostTypeInput.type = 'radio'
        hostTypeInput.name = 'user-type'
        hostTypeInput.value = 'RoomHost'

        hostTypeLabel.appendChild(hostTypeInput)
        hostTypeLabel.append('I have housing and I am looking for roommates')

        typeControl.appendChild(seekerTypeLabel)
        typeControl.appendChild(hostTypeLabel)

        typeField.appendChild(typeControl)

        //Create submit button
        const submitButton = document.createElement('input')
        submitButton.type = 'submit'
        submitButton.value = 'Submit'
        submitButton.className = 'button is-link is-medium'

        form.appendChild(nameField)
        form.appendChild(userNameField)
        form.appendChild(typeField)
        form.appendChild(submitButton)

        form.addEventListener('submit', this.executeSingup)

        return form
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
        signupButton.addEventListener('click', e => {
            this.renderFullPageBanner('Please enter your information below', this.renderSignupForm())
        })

        buttonArea.appendChild(loginButton)
        buttonArea.appendChild(signupButton)

        buttonLevel.appendChild(buttonArea)


        this.content = this.renderFullPageBanner('Welcome to Roomy', buttonLevel)

        return this.content
    }
}