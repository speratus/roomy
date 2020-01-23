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
                }
            })
        })

        return form
    }
}