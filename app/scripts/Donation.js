class Donation
{
    constructor()
    {
        this.$ = 
        {
            cards: document.querySelectorAll('.card'),
            donationButtons: document.querySelectorAll('.card__donationButton'),
            donationButtonsText: document.querySelectorAll('.card__donationButton p'),
            bars: document.querySelectorAll('.card__donationBar'),
            barsFiller: document.querySelectorAll('.card__donationFiller'),
            cardPointsContainer: document.querySelectorAll('.card .points'),
            cardPoints: document.querySelectorAll('.card .points__number'),
            cardImages: document.querySelectorAll('.card__image'),
            points: document.querySelector('.points__number'),
            validationMenu: document.querySelector('.bottomValidation'),
            validationButton: document.querySelector('.bottomValidation .cta'),
            canceledButton: document.querySelector('.bottomValidation__canceled'),
        }
        
        this.data =
        {
            points: 100,
            cardsPoints: [],
            initialClientY: 0
        }

        this.bool = 
        {
            cardTouch: [],
            cardActive: false,
        }

        this._initCardsData()
        this._listeners()

        setTimeout(() => {
            this._resetAll()
        }, 10000);
    }
    
    _listeners()
    {
        for(let i = 0; i < this.$.donationButtons.length; i++)
        {
            this.$.donationButtons[i].addEventListener('touchstart', (event) => 
            {
                this._handleDonationButton(event, i, true) 
            })
            this.$.donationButtons[i].addEventListener('touchend', (event) => 
            { 
                this._handleDonationButton(event, i, false) 
            })
        }

        this.$.canceledButton.addEventListener('touchstart', () => { this._resetAll() })
        this.$.validationButton.addEventListener('touchstart', () => { this._sendDonation() })
    }

    _initCardsData()
    {
        for(let i = 0; i < this.$.cards.length; i++)
        {
            this.bool.cardTouch[i] = false
            this.data.cardsPoints[i] = 0
        }

        this.$.points.innerText = this.data.points
        this.data.initialPoints = this.data.points
    }

    _handleDonationButton(_event, _i, _touchStart)
    {
        _event.preventDefault()
        
        if(_touchStart)
        {
            this.$.cards[_i].style.transform = 'scale(.98)'

            this.bool.cardTouch[_i] = true

            setTimeout(() => {
                if(this.bool.cardTouch[_i])
                {
                    this.bool.cardActive = true

                    this.$.cards[_i].addEventListener('touchmove', (event) => { this._handleBar(event, _i) })

                    this.$.cardPoints[_i].innerText = Math.round(this.data.points / 2)

                    this.data.points+= this.data.cardsPoints[_i]

                    this.$.cards[_i].style.transform = 'scale(1.04)'
                    this.$.cards[_i].classList.add('active')

                    this.data.points == 0 ? this.$.barsFiller[_i].style.opacity = .6 : this.$.barsFiller[_i].style.opacity = 1

                    this._resetDonation(_i)
                }
            }, 300);
        }
        else
        {
            this.bool.cardActive = false

            this.$.cards[_i].style.transform = 'scale(1)'

            this.bool.cardTouch[_i] = false
            this.$.cards[_i].classList.remove('active')

            this.data.currentPoints = this.data.points - this.data.cardsPoints[_i]
            this.data.points = this.data.currentPoints

            this.$.points.innerText = this.data.points

            if(this.data.cardsPoints[_i] > 0)
            {
                this.$.donationButtonsText[_i].innerText = this.data.cardsPoints[_i]
                this.$.donationButtons[_i].classList.add('active')
            }
            else
            {
                this.$.donationButtonsText[_i].innerText = 'Press to donate'
                this.$.donationButtons[_i].classList.remove('active')
            }

            if(this.data.points == this.data.initialPoints) 
            { 
                this.$.validationMenu.classList.remove('active')
            }
            else this.$.validationMenu.classList.add('active')
        
            console.log(this.data.currentPoints)
        }
    }

    _handleBar(_event, _i)
    {
        if(this.bool.cardActive)
        {
            if(this.data.initialClientY == 0) this.data.initialClientY = _event.targetTouches[0].clientY 
    
            let clientY = _event.targetTouches[0].clientY
            let deltaY = this.data.initialClientY - clientY
            let ratio = ((deltaY / this.data.initialClientY) / .5) + .5        
    
            if(ratio <= 1 && ratio >= 0 && this.data.points > 0)
            {
                this.data.cardsPoints[_i] = Math.round(this.data.points * ratio)

                this.$.cardPoints[_i].innerText = this.data.cardsPoints[_i]
                
                this.$.barsFiller[_i].style.transform = `scaleY(${ratio})`
            }
            else if(ratio >= 1 && this.data.points > 0)
            {
                this.data.cardsPoints[_i] = this.data.points
    
                this.$.barsFiller[_i].style.transform = `scaleY(${1})`
            }
            else if(ratio <= 0 && this.data.points > 0)
            {
                this.data.cardsPoints[_i] = 0
    
                this.$.barsFiller[_i].style.transform = `scaleY(${0})`
            }

            this.data.oldClientY = clientY
        }
        
    }

    _resetDonation(_i)
    {
        this.$.barsFiller[_i].style.transform = `scaleY(${.5})`

        this.data.initialClientY = 0
        this.data.oldClientY = 0

        // this.data.cardsPoints[_i] = 0
        // this.data.currentPoints = this.data.points - this.data.cardsPoints[_i]
        // this.data.points = this.data.currentPoints
    }

    _resetAll()
    {
        this.data.points = this.data.initialPoints

        for(let i = 0; i < this.$.cards.length; i++)
        {
            this.data.cardsPoints[i] = 0
            this.$.donationButtonsText[i].innerText = 'Press to donate'
            this.$.donationButtons[i].classList.remove('active')
        }

        this.$.points.innerText = this.data.points
    }

    _sendDonation()
    {
        for(let i = 0; i < this.$.cards.length; i++)
        {
            this.data.points = this.data.currentPoints
            this.data.cardsPoints[i] = 0
            this.$.donationButtonsText[i].innerText = 'Press to donate'
            this.$.donationButtons[i].classList.remove('active')
        }
    }
}