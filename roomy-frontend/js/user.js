class User {
    constructor(data) {
        for (let key in data) {
            this[key] = data[key]
        }
    }

    titlecaseWords(wordString) {
        const wordArr = wordString.split(' ')
        const newWords = wordArr.map(w => {
            const cap = w[0].toUpperCase()
            const rest = w.substring(1)
            return cap + rest
        })
        return newWords.join(' ')
    }

    renderControl(type, attribute) {
        const wrapper = document.createElement('div')
        wrapper.className = 'control'

        let input

        switch (type) {
            case 'text':
                input = document.createElement('input')
                input.type = 'text'
                input.name = attribute
                input.placeholder = this.titlecaseWords(attribute)
                input.className = 'input is-rounded is-primary'
                input.value = this[attribute] ? this[attribute] : ''
                break
            case 'textarea':
                input = document.createElement('textarea')
                input.name = attribute
                input.placeholder = this.titlecaseWords(attribute)
                input.className = 'textarea'
                input.value = this[attribute] ? this[attribute] : ''
                break
            case 'file':
                input = document.createElement('input')
                input.type = 'file'
                input.name = attribute
                input.className = 'button is-link'
                return input
            case 'submit':
                input = document.createElement('button')
                input.textContent = attribute
                input.className = 'button is-link'
                break
            case 'radio':
                return this.renderRadioControl(attribute, [
                    {text: 'I am looking for Roommates', value: 'RoomHost'},
                    {text: 'I am looking for someone to stay with', value: 'RoomSeeker'}
                ])
            default:
                return `${type} is not a valid input type`
        }
        wrapper.appendChild(input)
        return wrapper
    }

    renderRadioControl(attribute, options) {
        const control = document.createElement("div")
        control.className = 'control'

        for (let o of options) {
            const wrapper = document.createElement('label')
            wrapper.className = 'radio'

            const input = document.createElement('input')
            input.type = 'radio'
            input.name = attribute,
            input.value = o.value

            if (this[attribute] === o.value) {
                input.setAttribute('checked', '')
            }

            wrapper.appendChild(input)
            wrapper.append(' ' + o.text)

            control.appendChild(wrapper)
        }
        return control
    }

    renderField(type, attribute) {
        const wrapper = document.createElement('div')
        wrapper.className = 'field'

        const label = document.createElement('label')
        label.className = 'label'
        label.textContent = this.titlecaseWords(attribute)
        label.for = attribute

        wrapper.appendChild(label)
        wrapper.appendChild(this.renderControl(type, attribute))
        return wrapper
    }

    renderUserImage() {
        const figure = document.createElement('figure')
        figure.className = 'image'

        const img = document.createElement('img')
        img.id = 'user-avatar'
        img.src = this.avatar

        figure.appendChild(img)

        return figure
    }

    renderEditForm() {
        const form = document.createElement('form')
        form.id = 'edit-user-form'

        const displayedAvatar = this.renderUserImage()

        const name = this.renderField('text', 'name')
        const username = this.renderField('text', 'username')
        const type = this.renderField('radio', 'type')
        const avatar = this.renderField('file', 'avatar')

        avatar.addEventListener('change', e => {
            const file = e.target.files[0]

            const reader = new FileReader()
            reader.addEventListener('load', e => {
                const ava = document.querySelector('#user-avatar')
                ava.src = e.target.result
            })
            reader.readAsDataURL(file)

        })

        const submit = this.renderControl('submit', 'Save changes')

        form.appendChild(displayedAvatar)

        form.appendChild(name)
        form.appendChild(username)
        form.appendChild(type)
        form.appendChild(avatar)
        form.appendChild(submit)

        form.addEventListener('submit', e => {
            e.preventDefault()

            const name = e.target['name'].value
            const username = e.target['username'].value
            const type = e.target['type'].value
            const avatar = e.target['avatar'].files[0]
            console.log(avatar)

            const formData = new FormData()

            formData.append('user[name]', name)
            formData.append('user[username]', username)
            formData.append('user[user_type]', type)
            if (avatar) {
                formData.append('user[avatar]', avatar)
            }

            fetch(basePage.baseURL+`/users/${this.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            }).then(res => res.json()).then(user => {
                basePage.user = new User(user)
                document.querySelector("#edit-user-form").remove()
            })
        })

        return form
    }

    renderEditModal() {
        const modal = document.createElement('div')
        modal.className = 'modal is-active'
        modal.id = 'edit-user-form'

        const modalBack = document.createElement('div')
        modalBack.className = 'modal-background'

        modal.appendChild(modalBack)

        const modalCard = document.createElement('div')
        modalCard.className = 'modal-card'

        const modalHeader = document.createElement('header')
        modalHeader.className = 'modal-card-head'

        const modalTitle = document.createElement('p')
        modalTitle.className = 'modal-card-title'
        modalTitle.textContent = "Edit my info"

        const closeButton = document.createElement('button')
        closeButton.className = 'delete'
        closeButton.setAttribute('aria-label', 'close')
        closeButton.addEventListener('click', e => {
            document.querySelector('#edit-user-form').remove()
        })

        modalHeader.appendChild(modalTitle)
        modalHeader.appendChild(closeButton)

        modalCard.appendChild(modalHeader)

        const modalBody = document.createElement('section')
        modalBody.className = 'modal-card-body'
        modalBody.appendChild(this.renderEditForm())

        modalCard.appendChild(modalBody)

        const modalFooter = document.createElement('footer')
        modalFooter.className = 'modal-card-foot'

        const deleteButton = document.createElement('button')
        deleteButton.className = 'button is-danger'
        deleteButton.textContent = 'Delete my Profile'
        deleteButton.addEventListener('click', e => {
            fetch(basePage.baseURL+`/users/${this.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            }).then(res => res.json()).then(message => {
                if (message.user) {
                    document.querySelector('#edit-user-form').remove()
                    basePage.user = null
                    basePage.showWelcome()
                }
            })
        })
        modalFooter.appendChild(deleteButton)

        modalCard.appendChild(modalFooter)

        modal.appendChild(modalCard)

        return modal
    }
}