class Listing {
    constructor(listing) {
        for (let key in listing) {
            this[key] = listing[key]
        }
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

    renderDetails(displayApplications = false, showTitle = false) {
        const mediaContentWrapper = document.createElement('div')
        mediaContentWrapper.className = 'media-content'

        if (showTitle) {
            const title = document.createElement('h1')
            title.textContent = this.title
            title.className = 'title'
            mediaContentWrapper.appendChild(title)
        }

        const description = document.createElement('p')
        description.className = 'content'
        description.textContent = this.description

        const address = document.createElement('p')
        address.className = 'content'
        address.innerHTML = `<strong>Address:</strong> ${this.address}`

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


        /////////////////////////////////////////////////////////////////////////
        const userInfo = document.createElement('div')
        userInfo.className = 'content'

        const label = document.createElement('label')
        label.className = 'label'
        label.textContent = 'User Info'
        userInfo.appendChild(label)
        const span = document.createElement('strong')
        span.textContent = 'Name: '
        userInfo.appendChild(span)
        userInfo.append(this.user.name)

        const userImgWrapper = document.createElement('figure')
        userImgWrapper.className = 'image is-256x256'

        const img = document.createElement('img')
        // img.className = 'is-256x256'
        img.src = this.user.avatar
        userImgWrapper.appendChild(img)

        userInfo.appendChild(userImgWrapper)

        /////////////////////////////////////////////////////////////////////////
        
        
        mediaContentWrapper.appendChild(description)
        mediaContentWrapper.appendChild(address)
        mediaContentWrapper.appendChild(rentWrapper)
        mediaContentWrapper.appendChild(status)
        mediaContentWrapper.appendChild(roommates)
        mediaContentWrapper.appendChild(updatedTime)
        mediaContentWrapper.appendChild(idealCharacteristics)

        ////////////////////////////////////////////////////////////////////////
        mediaContentWrapper.appendChild(userInfo)
        ////////////////////////////////////////////////////////////////////////
        
        if (displayApplications) {
            const applicationContainer = document.createElement('div')
            applicationContainer.className = 'content'

            const roommates = this.applications.filter(app => app.status === 'accepted')
            console.log(roommates)

            const roommateLabel = document.createElement('label')
            roommateLabel.textContent = 'Roommates:'
            roommateLabel.className = 'label'
            applicationContainer.appendChild(roommateLabel)

            const roommateList = document.createElement('ul')
            roommateList.id = 'accepted-roommates'

            for (let r of roommates) {
                const roomy = new SeekerApplication(r)
                roommateList.appendChild(roomy.renderForListingDetail())
            }
            applicationContainer.appendChild(roommateList)

            const label = document.createElement('label')
            label.className = 'label'
            label.textContent = 'Applications:'
            applicationContainer.appendChild(label)

            const list = document.createElement('ul')

            for (let app of this.applications) {
                if (app.status !== 'rejected' && app.status !== 'accepted') {
                    const application = new SeekerApplication(app)
                    list.appendChild(application.renderForListingDetail())
                }
            }
            applicationContainer.appendChild(list)
            mediaContentWrapper.appendChild(applicationContainer)
        }

        return mediaContentWrapper
    }

    renderDetailsWithModal() {
        const listArticle = document.createElement('article')
        listArticle.className = 'media'

        listArticle.appendChild(this.renderMediaObject())
        
        const details = this.renderDetails()

        const application = new SeekerApplication({
            'user_id': basePage.user.id,
            'listing_id': this.id
        })
        details.appendChild(application.renderInvisibleForm())
        
        const applyButton = document.createElement('button')
        applyButton.className = 'button is-link'
        applyButton.textContent = 'Apply'
        applyButton.addEventListener('click', e => {
            e.target.remove()
            const form = document.querySelector('#application-form')
            form.classList.remove('is-hidden')
        })
        details.appendChild(applyButton)

        listArticle.appendChild(details)

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

    titleCaseWords(words) {
        let wordArray = words.split(' ')
        let newWords = wordArray.map(word => {
            let capital = word[0].toUpperCase()
            let rest = word.substring(1)
            return capital + rest
        })
        return newWords
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
                input.placeholder = this.titleCaseWords(attribute)
                input.value = this[attribute] ? this[attribute] : ''
                break
            case 'textarea':
                input = document.createElement('textarea')
                input.className = 'textarea has-fixed-size is-primary'
                input.name = attribute
                input.placeholder = this.titleCaseWords(attribute)
                input.value = this[attribute] ? this[attribute] : ''
                break
            case 'select':
                input = this.renderSelect(attribute, ['open', 'partially-filled', 'closed'])
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
        label.textContent = this.titleCaseWords(attribute)

        container.appendChild(label)
        container.appendChild(this.renderControl(type, attribute))

        return container
    }

    renderEditForm(target = `/listings`, method = 'POST') {
        const form = document.createElement('form')
        form.dataset.id = this.id

        const title = this.renderField('text', 'title')

        const address = this.renderField('text', 'address')

        const image = document.createElement('input')
        image.type = 'file'
        image.className = 'button'
        image.name = 'image'

        const status = this.renderField('select', 'status')

        const targetNumberOfRoommates = this.renderField('text', 'targetNumberOfRoommates')

        const description = this.renderField('textarea', 'description')

        const rent = this.renderField('text', 'rent')

        const submit = document.createElement('button')
        submit.className = 'button is-link'
        submit.textContent = 'Submit changes'

        form.appendChild(title)
        form.appendChild(description)
        form.appendChild(address)
        form.appendChild(image)
        form.appendChild(rent)
        form.appendChild(status)
        form.appendChild(targetNumberOfRoommates)
        form.appendChild(submit)

        form.addEventListener('submit', e => {
            e.preventDefault()

            const title = e.target['title'].value
            const description = e.target['description'].value
            const address = e.target['address'].value
            const status = e.target['status'].value
            const roommateNumber = parseInt(e.target['targetNumberOfRoommates'].value)
            const rent = parseInt(e.target['rent'].value)
            const image = e.target['image'].files[0]

            const formData = new FormData()
            
            formData.append('listing[title]', title)
            formData.append('listing[description]', description)
            formData.append('listing[address]', address)
            formData.append('listing[status]', status)
            formData.append('listing[target_roommate_number]', roommateNumber)
            formData.append('listing[monthly_rent]', rent)
            if (image) {
                formData.append('listing[image]', image)
            }

            const id = e.target.dataset.id

            if (method === 'POST') {
                formData.append('listing[user_id]', this.userId)
            }
            console.log(basePage.baseURL+target)
            console.log(method)

            fetch(basePage.baseURL+target, {
                method: method,
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            }).then(res => res.json()).then(listingData => {
                console.log(listingData)
                if (listingData.id) {
                    basePage.user.listingId = listingData.id
                    basePage.showMain()
                } else {
                    basePage.renderModalNotification(listingData.message + " " + listingData.errors.join(', '), 'is-danger')
                }
            })
        })

        return form
    }
}