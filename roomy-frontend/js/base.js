class BasePage {
    constructor() {
        this.main = document.body
        this.navbar = null
        this.userId = null
        this.baseURL = 'http://localhost:3000'
    }

    static clearElements(node) {
        console.log('clear elements called from', this)
        if (node !== null & node !== undefined) {
            while (node.firstChild) {
                node.firstChild.remove()
            }
        }
    }

    showWelcome(e) {
        BasePage.clearElements(this.main)

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

            const mainPage = new MainPage(listingObjs)

            this.main.appendChild(mainPage.renderListingsList())
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
}

const basePage = new BasePage()