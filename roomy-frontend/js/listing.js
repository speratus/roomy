class Listing {
    constructor({id, title, description, address, rent, status, targetNumberOfRoommates, user, updatedAt, preferredCharacteristics, image}) {
        this.id = id
        this.description = description
        this.address = address
        this.rent = rent
        this.status = status
        this.title = title
        this.targetNumberOfRoommates = targetNumberOfRoommates
        this.image = image
        this.updatedAt = updatedAt
        this.user = user
        this.preferredCharacteristics = preferredCharacteristics
    }

    renderListingForList() {
        const boxContainer = document.createElement('div')
        boxContainer.className = 'box'
        boxContainer.dataset.id = this.id

        const listArticle = document.createElement('article')
        listArticle.className = 'media'

        
        listArticle.appendChild(this.renderMediaObject())

        const mediaContentWrapper = document.createElement('div')
        mediaContentWrapper.className = 'media-content'

        const mediaContent = document.createElement('div')
        mediaContent.className = 'content'

        const content = document.createElement('p')
        content.className = 'wrapped'

        const title = document.createElement('strong')
        title.textContent = this.title

        const breakEl = document.createElement('br')

        content.appendChild(title)
        content.appendChild(breakEl)
        content.append(this.description)

        mediaContent.appendChild(content)
        mediaContentWrapper.appendChild(mediaContent)
        listArticle.appendChild(mediaContentWrapper)

        boxContainer.appendChild(listArticle)

        boxContainer.addEventListener('click', this.executeListingClick)

        return boxContainer
    }

    executeListingClick(e) {
        const id = this.dataset.id
        fetch(basePage.baseURL+`/listings/${id}`).then(res => {
            return res.json()
        }).then(json => {
            const l = new Listing(json)
            document.body.appendChild(l.renderDetailsWithModal())
        })
    }

    renderMediaObject() {
        const imgFigure = document.createElement('figure')
        imgFigure.className = 'media-left'

        const imgP = document.createElement('p')
        imgP.className = 'image is-64x64'

        const listingImg = document.createElement('img')
        listingImg.src = this.image

        imgP.appendChild(listingImg)
        imgFigure.appendChild(imgP)
        return imgFigure
    }

    renderDetails() {
        const mediaContentWrapper = document.createElement('div')
        mediaContentWrapper.className = 'media-content'

        const description = document.createElement('p')
        description.className = 'content'
        description.textContent = this.description

        const rentWrapper = document.createElement('p')
        rentWrapper.className = 'content'
        rentWrapper.innerHTML = `<strong>Rent:</strong> ${this.rent}`

        const status = document.createElement('p')
        status.className = 'content'
        status.innerHTML = `<strong>Status:</strong> ${this.status}`

        const roommates = document.createElement('p')
        roommates.className = 'content'
        roommates.innerHTML = `<strong>Ideal number of Roommates:</strong> ${this.targetNumberOfRoommates}`

        const updatedTime = document.createElement('p')
        updatedTime.className = 'content'
        updatedTime.innerHTML = `<strong>Last updated:</strong> ${this.updatedAt}`

        const characteristics = this.preferredCharacteristics.map(c => c.description)

        const idealCharacteristics = document.createElement('p')
        idealCharacteristics.innerHTML = `<strong>Preferred characteristics:</strong> ${characteristics.join(', ')}`


        mediaContentWrapper.appendChild(description)
        mediaContentWrapper.appendChild(rentWrapper)
        mediaContentWrapper.appendChild(status)
        mediaContentWrapper.appendChild(roommates)
        mediaContentWrapper.appendChild(updatedTime)
        mediaContentWrapper.appendChild(idealCharacteristics)

        return mediaContentWrapper
    }

    renderDetailsWithModal() {
        const listArticle = document.createElement('article')
        listArticle.className = 'media'

        listArticle.appendChild(this.renderMediaObject())
        listArticle.appendChild(this.renderDetails())

        return this.renderModal(this.title, listArticle)
    }

    renderModal(title, contents) {
        // console.log('rendering modal')
        const modal = document.createElement('div')
        modal.className = 'modal is-active'
        modal.id = 'listing-details'

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
            document.querySelector('#listing-details').remove()
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

        // const footerClose = document.createElement('button')
        // footerClose.className = 'button'
        // footerClose.textContent = 'close'
        // footerClose.addEventListener('click', e => {
        //     document.querySelector('#listing-details').remove()
        // })

        // modalFooter.appendChild(footerClose)

        modalCard.appendChild(modalFooter)

        modal.appendChild(modalCard)

        return modal
    }

    renderControl(type, attribute) {
        const container = document.createElement('div')
        container.className = 'control'

        let input

        switch(type) {
            case 'text':
                input = document.createElement('input')
                input.className = 'input is-rounded is-primary'
                input.name = attribute
                input.placeholder = attribute
                input.value = this[attribute]
                break
            case 'textarea':
                input = document.createElement('textarea')
                input.className = 'textarea has-fixed-size is-primary'
                input.name = attribute
                input.placeholder = attribute
                input.value = this[attribute]
                break
            default:
                return 'Invalid type please enter a valid one'
        }
        container.appendChild(input)
        return container
    }

    renderSelect(attribute, values) {
        const container = document.createElement('div')
        container.className = 'control'

        const selectWrapper = document.createElement('div')
        selectWrapper.className = 'select is-rounded is-primary'

        const select = document.createElement('select')
        select.name = attribute

        for (let v of values) {
            const o = document.createElement('option')
            o.value = v
            o.textContent = v

            select.appendChild(o)
        }

        selectWrapper.appendChild(select)
        container.appendChild(selectWrapper)

        return container
    }

    renderField(type, attribute) {
        const container = document.createElement('div')
        container.className = 'field'

        const label = document.createElement('label')
        label.for = attribute
        label.textContent = attribute

        container.appendChild(label)
        container.appendChild(this.renderControl(type, attribute))

        return container
    }

    renderEditForm() {
        const form = document.createElement('form')
        form.dataset.id = this.id

        const title = this.renderField('text', 'title')

        const address = this.renderField('text', 'address')

        const status = this.renderSelect('status', ['open', 'partially-filled', 'closed'])

        const targetNumberOfRoommates = this.renderField('text', 'targetNumberOfRoommates')

        const description = this.renderField('textarea', 'description')

        const submit = document.createElement('button')
        submit.className = 'button is-link'
        submit.textContent = 'Submit changes'

        form.appendChild(title)
        form.appendChild(description)
        form.appendChild(address)
        form.appendChild(status)
        form.appendChild(targetNumberOfRoommates)
        form.appendChild(submit)

        return form
    }
}