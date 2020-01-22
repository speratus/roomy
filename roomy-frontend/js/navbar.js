class Navbar {
    constructor(...buttons) {
        this.navbar = document.createElement('nav')
        this.navbar.className = 'navbar'
        this.rendered = false
    }
    
    renderNavbar(...buttons) {
        if (!this.rendered) {
            const brand = document.createElement('div')
            brand.className = 'navbar-brand'
            brand.id = 'navbar-brand'

            const homeLink = document.createElement('a')
            homeLink.onclick = basePage.showWelcome.bind(basePage)
            homeLink.className = 'navbar-item'
            const text = document.createElement('span')
            text.textContent = 'Roomy'
            homeLink.appendChild(basePage.renderIcon('mdi-home-city mdi-24px'))
            homeLink.appendChild(text)

            brand.appendChild(homeLink)

            const menu = document.createElement('div')
            menu.className = 'navbar-menu'
            menu.id = 'navbar-menu'

            const leftItems = document.createElement('div')
            leftItems.className = 'navbar-start'
            leftItems.id = 'left'

            const rightItems = document.createElement('div')
            rightItems.className = 'navbar-end'
            rightItems.id = 'right'

            menu.appendChild(leftItems)
            menu.appendChild(rightItems)

            for (let b of buttons) {
                leftItems.appendChild(this.renderButton(b))
            }
            this.navbar.appendChild(brand)
            this.navbar.appendChild(menu)

            this.rendered = true
        }
        
        return this.navbar
    }

    renderButton(button) {
        const link = document.createElement('a')
        link.onclick = button.action

        if (button.icon) {
            link.appendChild(basePage.renderIcon(button.icon))

            const textSpan = document.createElement('span')
            textSpan.textContent = button.text

            link.appendChild(textSpan)
        } else {
            link.textContent = button.text
        }

        return link
    }


}