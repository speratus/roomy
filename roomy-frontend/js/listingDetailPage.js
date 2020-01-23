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

        const leftMedia = document.createElement('div')
        leftMedia.className = 'media-left'
        leftMedia.appendChild(this.renderImage())

        mediaContainer.appendChild(leftMedia)
        mediaContainer.appendChild(this.listing.renderDetails())

        contentSection.appendChild(mediaContainer)

        main.appendChild(contentSection)

        return main
    }
}