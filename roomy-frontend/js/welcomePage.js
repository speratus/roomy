class WelcomePage {
    constructor() {
        this.content = document.createElement('main')
        this.content.id = 'main-content'
    }

    renderModalNotification(message, modifier) {
        console.log('rendering notification modal')
        const modal = document.createElement('div')
        modal.className = 'modal is-active'
        modal.id = 'notification-modal'

        // const modalBack = document.createElement('div')
        // modalBack.className = 'modal-background'
        // modal.appendChild(modalBack)

        const modalContent = document.createElement('div')
        modalContent.className = 'modal-content'

        const notification = document.createElement('div')
        notification.className = `notification ${modifier}`
        
        const deleteButton = document.createElement('button')
        deleteButton.className = 'delete'
        deleteButton.addEventListener('click', e => {
            document.querySelector('#notification-modal').remove()
        })

        notification.appendChild(deleteButton)

        notification.append(message)

        modalContent.append(notification)

        modal.append(modalContent)

        document.body.appendChild(modal)
    }

    renderFullPageBanner(mainText, contents) {
        // console.log('called from ', this)
        BasePage.clearElements(this.content)

        const bannerSection = document.createElement('section')
        bannerSection.className = 'hero is-primary is-fullheight'

        const bannerBody = document.createElement('hero-body')
        bannerBody.className = 'hero-body'

        const centerer = document.createElement('div')
        centerer.className = 'container has-text-centered'

        const title = document.createElement('h1')
        title.className = 'title is-1'
        title.textContent = mainText

        // console.log(contents)

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

        fetch('http://localhost:3000/login?showApplications=true', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: username
            })
        }).then(res => res.json()).then(message => {
            if (message.success) {
                basePage.user = message.user
                basePage.showMain()
                const user = new User(message.user)
                // console.log(user)
                navBar.setEditInfoButton('Edit my Info', () => {
                    document.body.appendChild(user.renderEditModal('Edit my info', user.renderEditForm()))
                }, 'nav-edit-button', 'mdi-account-circle')
                navBar.setApplicationsButton(user)
            } else {
                this.renderModalNotification(message.message, 'is-danger')
            }
        })
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
        }).then(res => res.json()).then(message => {
            if (message.id) {
                basePage.user = message
                if (message.type === 'RoomSeeker') {
                    navBar.setEditInfoButton('Edit my Info', () => {
                        const newUser = new User(message)
                        document.body.appendChild(newUser.renderEditModal('Edit my info', newUser.renderEditForm()))
                    }, 'nav-edit-button', 'mdi-account-circle')
                    navBar.setApplicationsButton(message)
                    basePage.showMain()
                } else {
                    navBar.setEditInfoButton('Edit my Info', () => {
                        const newUser = new User(message)
                        document.body.appendChild(newUser.renderEditModal('Edit my Info', newUser.renderEditForm()))
                    }, 'nav-edit-button', 'mdi-account-circle')
                    basePage.showMain()
                    this.renderListingFormModal(message.id)
                }
            } else {
                console.log(message)
                this.renderModalNotification(message.message + ` ${message.errors.join(', ')}`, 'is-danger')
            }
        })
    }

    renderListingFormModal(userId) {
        const modal = document.createElement('div')
        modal.className = 'modal is-active'
        modal.id = 'new-listing-modal'

        const modalBack = document.createElement('div')
        modalBack.className = 'modal-background'
        modal.appendChild(modalBack)

        const modalCard = document.createElement('div')
        modalCard.className = 'modal-card'

        const modalHeader = document.createElement('div')
        modalHeader.className = 'modal-card-header'

        const modalBody = document.createElement('div')
        modalBody.className = 'modal-card-body'

        modalBody.appendChild(new Listing({userId: userId}).renderEditForm())

        const modalFooter = document.createElement('div')
        modalFooter.className = 'modal-card-foot'

        modalCard.appendChild(modalHeader)
        modalCard.appendChild(modalBody)
        modalCard.appendChild(modalFooter)
        
        modal.appendChild(modalCard)

        document.body.appendChild(modal)
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

        loginForm.addEventListener('submit', this.executeLogin.bind(this))
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
        seekerTypeLabel.append(' I am looking for someone to room with')

        const hostTypeLabel = document.createElement('label')
        hostTypeLabel.className = 'radio'

        const hostTypeInput = document.createElement('input')
        hostTypeInput.type = 'radio'
        hostTypeInput.name = 'user-type'
        hostTypeInput.value = 'RoomHost'

        hostTypeLabel.appendChild(hostTypeInput)
        hostTypeLabel.append(' I have housing and I am looking for roommates')

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

        form.addEventListener('submit', this.executeSingup.bind(this))

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