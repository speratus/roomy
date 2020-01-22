class MainPage {
    constructor(listings) {
        this.listings = listings
    }

    renderListingsList() {
        const main = document.createElement('main')
        main.id = 'main-content'

        const contentSection = document.createElement('section')
        contentSection.className = 'section has-background-primary is-fullheight'

        for (let l of this.listings) {
            const levelContainer = document.createElement('section')
            levelContainer.className = 'level'

            const levelItem = document.createElement('div')
            levelItem.className = 'level-item'

            levelItem.appendChild(l.renderListingForList())

            levelContainer.appendChild(levelItem)
            contentSection.appendChild(levelContainer)
        }

        main.appendChild(contentSection)

        return main
    }

}