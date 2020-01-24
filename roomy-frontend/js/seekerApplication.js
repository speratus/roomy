class SeekerApplication {
    constructor(application) {
        for (let key in application) {
            this[key] = application[key]
        }
    }

    renderControl(attribute) {
        const container = document.createElement('div')
        container.className = 'control'

        const input = document.createElement('input')
        input.className = 'input is-rounded is-primary'
        input.name = attribute
        input.placeholder = attribute
        input.value = this[attribute] ? this[attribute] : ''

        container.appendChild(input)

        return container
    }

    renderField(attribute) {
        const container = document.createElement('div')
        container.className = 'field'

        const label = document.createElement('label')
        label.className = 'label'
        label.for = attribute
        label.textContent = attribute

        container.appendChild(label)
        container.appendChild(this.renderControl(attribute))
        
        return container
    }

    renderInvisibleForm() {
        const form = document.createElement('form')
        form.className = 'is-hidden'
        form.id = 'application-form'

        const message = this.renderField('message')

        const submit = document.createElement('button')
        submit.className = 'button is-link'
        submit.textContent = 'Apply'

        form.appendChild(message)
        form.appendChild(submit)

        form.addEventListener('submit', e => {
            e.preventDefault()
            
            const message = e.target['message'].value
            const status = 'applied'

            BasePage.clearElements(e.target)

            const data = {
                'user_id': this['user_id'],
                'listing_id': this['listing_id'],
                message: message,
                status: status
            }

            const paramsData = {application: data}

            fetch(basePage.baseURL+`/seeker_applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(paramsData)
            }).then(res => res.json()).then(message => {
                if (message.id) {
                    e.target.append('Application Sent successfully')
                    fetch(basePage.baseURL+`/seeker_applications/${message.id}`).then(res => res.json())
                        .then(app => {
                            if (app.id) {
                                basePage.user.applications.push(app)
                            }
                        })
                }
            })
        })

        return form
    }

    renderModal(title, contents) {
        const modal = document.createElement('div')
        modal.className = 'modal is-active'
        modal.id = 'application-details'

        const modalBack = document.createElement('div')
        modalBack.className = 'modal-background'

        modal.appendChild(modalBack)

        const modalCard = document.createElement('div')
        modalCard.className = 'modal-card'

        const modalHeader = document.createElement('header')
        modalHeader.className = 'modal-card-head'

        const modalTitle = document.createElement('p')
        modalTitle.className = 'modal-card-title'
        modalTitle.textContent = title

        const closeButton = document.createElement('button')
        closeButton.className = 'delete'
        closeButton.setAttribute('aria-label', 'close')
        closeButton.addEventListener('click', e => {
            document.querySelector('#application-details').remove()
        })

        modalHeader.appendChild(modalTitle)
        modalHeader.appendChild(closeButton)

        modalCard.appendChild(modalHeader)

        const modalBody = document.createElement('section')
        modalBody.className = 'modal-card-body'
        modalBody.appendChild(contents)

        modalCard.appendChild(modalBody)

        const modalFooter = document.createElement('footer')
        modalFooter.className = 'modal-card-foot'

        const acceptButton = document.createElement('button')
        acceptButton.className = 'button is-success'
        acceptButton.textContent = 'Accept'
        acceptButton.addEventListener('click', e => {
            fetch(basePage.baseURL+`/seeker_applications/${this.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    application: {
                        status: 'accepted'
                    }
                })
            }).then(res => res.json()).then(message => {
                if (message.id) {
                    document.querySelector('#application-details').remove()
                    document.getElementById(`${message.id}`).remove()

                    const list = document.querySelector('#accepted-roommates')
                    console.log('appending new item to', list)
                    list.appendChild(this.renderForListingDetail())
                }
            })
        })
        modalFooter.appendChild(acceptButton)

        const rejectButton = document.createElement('button')
        rejectButton.className = 'button is-danger'
        rejectButton.textContent = 'Reject'
        rejectButton.addEventListener('click', e => {
            fetch(basePage.baseURL+`/seeker_applications/${this.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    application: {
                        status: 'rejected'
                    }
                })
            }).then(res => res.json()).then(message => {
                if (message.id) {
                    document.querySelector('#application-details').remove()
                    document.getElementById(`${message.id}`).remove()
                }
            })
        })
        modalFooter.appendChild(rejectButton)

        modalCard.appendChild(modalFooter)

        modal.appendChild(modalCard)

        return modal
    }

    renderUserImage(url) {
        console.log('rendering an image')
        console.log(url)
        const wrapper = document.createElement('figure')
        wrapper.className = 'image'

        const img = document.createElement('img')
        // img.className = 'is-rounded'
        img.src = url

        wrapper.appendChild(img)
        console.log(wrapper)
        return wrapper
    }

    renderForListingDetail() {
        console.log(this)
        const container = document.createElement('li')
        container.id = this.id

        const name = document.createElement('a')
        name.textContent = this.applicant.name

        name.addEventListener('click', e => {
            const container = document.createElement('div')
            container.className = 'container'
            
            const imageContainer = document.createElement('div')
            imageContainer.className = 'level'
            
            const imgLevelItem = document.createElement('div')
            imgLevelItem.className = 'level-item'
            imgLevelItem.appendChild(this.renderUserImage(this.applicant.avatar))

            imageContainer.appendChild(imgLevelItem)

            container.appendChild(imageContainer)

            const messageContainer = document.createElement('div')
            messageContainer.className = 'level'

            const messageLevelItem = document.createElement('div')
            messageLevelItem.className = 'level-item'

            const message = document.createElement('p')
            message.className = 'content'
            // message.textContent = this.message
            messageLevelItem.appendChild(message)

            const messageLabel = document.createElement('label')
            messageLabel.className = 'label'
            messageLabel.textContent = 'Message:'
            message.appendChild(messageLabel)
            message.append(this.message)

            messageContainer.appendChild(messageLevelItem)

            container.appendChild(messageContainer)

            document.body.appendChild(this.renderModal(this.applicant.name, container))
        })

        container.appendChild(name)

        return container
    }

    renderApplicationForUser() {
        // console.log('rendering application')
        const container = document.createElement('div')
        container.className = 'level'
        container.id = `application-level-${this.id}`

        // const contentWrapper = document.createElement('div')
        // contentWrapper.className = 'level-item'

        // const innerWrapper = document.createElement('div')


        const listingTitle = document.createElement('p')
        listingTitle.className = 'level-item'
        listingTitle.innerHTML = `<strong>${this.listing.title}</strong>`
        // innerWrapper.appendChild(listingTitle)

        const message = document.createElement('p')
        message.className = 'level-item'
        message.textContent = this.message
        // innerWrapper.appendChild(message)

        // contentWrapper.appendChild(listingTitle)
        // contentWrapper.appendChild(message)
        // contentWrapper.appendChild(innerWrapper)

        // container.appendChild(contentWrapper)

        const statusContainer = document.createElement('p')
        statusContainer.className = 'level-item'
        statusContainer.innerHTML = `<strong>${this.status}</strong>`

        const buttonWrapper = document.createElement('div')
        buttonWrapper.className = 'level-item buttons'

        const deleteButton = document.createElement('button')
        deleteButton.className = 'button is-danger'
        deleteButton.textContent = 'Delete Application'
        deleteButton.addEventListener('click', e => {
            fetch(basePage.baseURL+`/seeker_applications/${this.id}`, {
                method: 'DELETE'
            }).then(res => res.json()).then(message => {
                console.log(message)
                if (message.application) {
                    console.log(`deleting level application-level-${this.id}`)
                    document.getElementById(`application-level-${this.id}`).remove()
                }
            })
        })

        buttonWrapper.appendChild(deleteButton)

        container.appendChild(listingTitle)
        container.appendChild(message)
        container.appendChild(statusContainer)
        container.appendChild(buttonWrapper)

        return container
    }
}