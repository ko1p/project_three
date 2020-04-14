class FormValidator {
    constructor(popupElement) {
      this.setEventListeners(popupElement);
    }
  
    checkInputValidity(event) {
      let inputElem = event.target;
      let errorElem = event.target.nextElementSibling;
      let errorMessage;
  
      if (!(inputElem.checkValidity())) {
        if (inputElem.validity.valueMissing) {
          errorMessage = ValidationMessages.validationValueMissing;
        } else if (inputElem.validity.tooShort) {
          errorMessage = ValidationMessages.validationLenghtErr;
        } else if (inputElem.validity.patternMismatch) {
          errorMessage = ValidationMessages.validationNotUrl;
        }
        errorElem.classList.add('popup__form-error_active');
        errorElem.textContent = errorMessage;
      } else {
        errorElem.classList.remove('popup__form-error_active');
        errorElem.textContent = '';
      }
    }
  
    setSubmitButtonState(event) {
      let inputsArray = Array.from(event.target.parentElement.querySelectorAll('.popup__input'));
      let isValidForm = false;
      isValidForm = inputsArray.every(function(item) {
        return item.checkValidity() === true;
      })
    
      if (isValidForm) {
        event.target.parentElement.querySelector('#button').classList.add('button_active');
        event.target.parentElement.querySelector('#button').removeAttribute("disabled", "disabled");   
      } else {
        event.target.parentElement.querySelector('#button').classList.remove('button_active');
        event.target.parentElement.querySelector('#button').setAttribute("disabled", "disabled");
      }
      
    }
  
    setEventListeners(popupElement) {
      popupElement.querySelectorAll('.popup__input').forEach(function(item){
        item.addEventListener('input', FormValidator.prototype.checkInputValidity)
      })
      popupElement.querySelectorAll('.popup__input').forEach(function(item){
        item.addEventListener('input', FormValidator.prototype.setSubmitButtonState)
      })

    }
  
}