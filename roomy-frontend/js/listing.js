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

        const listArticle = document.createElement('article')
        listArticle.className = 'media'

        const imgFigure = document.createElement('figure')
        imgFigure.className = 'media-figure'

        const imgP = document.createElement('p')
        imgP.className = 'image is-64x64'

        const listingImg = document.createElement('img')
        listingImg.src = this.image

        imgP.appendChild(listingImg)
        imgFigure.appendChild(imgP)

        const mediaContentWrapper = document.createElement('div')
        mediaContentWrapper.className = 'media-content'

        const mediaContent = document.createElement('div')
        mediaContent.className = 'content'

        const content = document.createElement('p')

        const title = document.createElement('strong')
        title.textContent = this.title

        const breakEl = document.createElement('br')

        content.appendChild(title)
        content.appendChild(breakEl)
        content.append(this.description)

        mediaContent.appendChild(content)
        mediaContentWrapper.appendChild(mediaContent)

        boxContainer.appendChild(imgFigure)
        boxContainer.appendChild(mediaContentWrapper)

        return boxContainer
    }
}