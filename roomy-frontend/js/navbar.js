class Navbar {
    constructor(...buttons) {
        this.navbar = document.createElement('nav')
        this.navbar.className = 'navbar'
        this.rendered = false
    }
    
    renderNavbar(...buttons) {
        if (!rendered) {
            const brand = document.createElement('div')
            brand.className = 'navbar-brand'

            const homeLink = document.createElement('a')
            homeLink.onclick = basePage.showMain
            homeLink.className = 'navbar-item'
            const text = document.createElement('span')
            text.textContent = 'Roomy'
            homeLink.appendChild(basePage.renderIcon('mdi-home-city mdi-24px'))
            homeLink.appendChild(text)

            brand.appendChild(homeLink)

            //...

            for (let b of buttons) {
                this.navbar.appendChild(this.renderButton(b))
            }
            this.navbar.appendChild(brand)

            this.rendered = true
        }
        
        return this.navbar
    }

    renderButton(button) {

    }


}