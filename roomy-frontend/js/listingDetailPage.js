class ListingDetailPage {
    constructor(listing) {
        this.listing = listing
    }

    renderImage() {
        const imgContainer = document.createElement('p')
        imgContainer.className = 'image is-128x128'

        const img = document.createElement('img')
        img.src = this.listing.image

        imgContainer.appendChild(img)
        return imgContainer
    }

    renderListingPage() {
        const main = document.createElement('main')
        main.id = 'main-content'

        const contentSection = document.createElement('section')
        contentSection.className = 'section has-background-primary is-fullheight'

        const mediaContainer = document.createElement('article')
        mediaContainer.className = 'media'
        mediaContainer.id = 'details'

        const leftMedia = document.createElement('div')
        leftMedia.className = 'media-left'
        leftMedia.appendChild(this.renderImage())

        const editButton = document.createElement('button')
        editButton.className = 'button is-link'
        editButton.textContent = 'Edit my Listing'
        editButton.addEventListener('click', e => {
            this.renderEditForm()
        })

        mediaContainer.appendChild(leftMedia)
        const details = this.listing.renderDetails()
        details.appendChild(editButton)
        mediaContainer.appendChild(details)

        contentSection.appendChild(mediaContainer)

        main.appendChild(contentSection)

        return main
    }

    renderEditForm() {
        const container = document.querySelector('#details')
        BasePage.clearElements(container)

        container.appendChild(this.listing.renderEditForm())
    }
}