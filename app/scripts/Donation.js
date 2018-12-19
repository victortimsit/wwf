class Donation
{
    constructor()
    {
        this.$ = 
        {
            cards: document.querySelectorAll('.card'),
            donationButtons: document.querySelectorAll('.card__donationButton'),
            bars: document.querySelectorAll('.card__donationBar'),
            cardPoints: document.querySelectorAll('.card .points'),
            cardImages: document.querySelectorAll('.card__image'),
        }
        console.log(this.$.donationButtons)

        this._listeners()
    }
    
    _listeners()
    {
        for(let i = 0; i < this.$.donationButtons.length; i++)
        {
            this.$.donationButtons[i].addEventListener('touchstart', (event) => { this._handleDonationButton(event, i, true) })
            this.$.donationButtons[i].addEventListener('touchend', (event) => { this._handleDonationButton(event, i, false) })
        }
    }

    _handleDonationButton(_event, _i, _touchStart)
    {
        _event.preventDefault()
        
        if(_touchStart)
        {
            this.$.cards[_i].classList.add('active')
        }
        else
        {
            this.$.cards[_i].classList.remove('active')
        }
    }
}