class BasePage {
    constructor() {
        this.main = document.body
        this.navbar = null
        // this.userId = null
        this.baseURL = 'http://localhost:3000'
        this.user = null
    }

    static clearElements(node) {
        // console.log('clear elements called from', this)
        if (node !== null & node !== undefined) {
            while (node.firstChild) {
                node.firstChild.remove()
            }
        }
    }

    showWelcome(e) {
        BasePage.clearElements(this.main)

        // console.log('removing elements')
        // console.log(document.getElementById('left'))
        // console.log(document.getElementById('right'))
        // BasePage.clearElements(document.querySelector('#left'))
        // BasePage.clearElements(document.querySelector('#right'))

        this.main.appendChild(this.navbar)

        const welcomePage = new WelcomePage()
        this.main.appendChild(welcomePage.renderWelcomeView())
    }

    showMain() {
        BasePage.clearElements(this.main)

        this.main.appendChild(this.navbar)

        fetch(this.baseURL+'/listings').then(res => res.json()).then(listings => {
            const listingObjs = []
            for (let l of listings) {
                listingObjs.push(new Listing(l))
            }


            if (this.user.type === 'RoomHost') {
                console.log(`${this.user.username} is a room host`)
                fetch(this.baseURL+`/listings/${this.user.listingId}?showApplications=true`).then(res => res.json()).then(listingData => {
                    const listing = new Listing(listingData)

                    const listingPage = new ListingDetailPage(listing)

                    this.main.appendChild(listingPage.renderListingPage())
                })
            } else {
                const mainPage = new MainPage(listingObjs)
    
                this.main.appendChild(mainPage.renderListingsList())
            }

        })
    }

    renderIcon(iconName, iconModifiers) {
        const span = document.createElement('span')
        span.className = `icon ${iconModifiers}`

        const i = document.createElement('i')
        i.className = `mdi ${iconName}`

        span.appendChild(i)

        return span
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
}

const basePage = new BasePage()