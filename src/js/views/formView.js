import { timeout } from '../helper';
import mapView from './mapView';
import * as model from '../model';

class formView {
  #form = document.getElementById('form');
  #duration = document.querySelector('.form__input--duration');
  #inputElevation = document.querySelector('.form__input--elevation');
  #inputCadence = document.querySelector('.form__input--cadence');
  #inputType = document.querySelector('.form__input--type');
  #selection = document.querySelector('.form__input--cadence');

  addHandlerForm = (handler1, handler2) => {
    this.#inputType.addEventListener('change', () => {
      this.toggleElevationField();
      this.formValidation();
    });
    this.#form.addEventListener('submit', async e => {
      try {
        let handler = model.state.edit ? handler2 : handler1;
        e.preventDefault();
        if (this.formValidation()) {
          this.#form.classList.add('hidden');
          await Promise.race([handler(), timeout(10)]);
          this.#form.reset();
          this.#inputElevation
            .closest('.form__row')
            .classList.add('form__row--hidden');
          this.#inputCadence
            .closest('.form__row')
            .classList.remove('form__row--hidden');
          model.state.edit = false;
        }
      } catch (err) {
        mapView.renderError(err);
      }
    });
  };

  formValidation = () => {
    let checkDuration;
    let checkSelection;
    this.#selection =
      this.#inputType.value == 'running'
        ? this.#inputCadence
        : this.#inputElevation;
    if (this.checkRequired(this.#duration)) {
      checkDuration = this.checkInput(this.#duration);
    }

    if (this.checkRequired(this.#selection)) {
      checkSelection = this.checkInput(this.#selection);
    }
    return checkDuration && checkSelection;
  };
  // Show input error message
  showError = (input, message) => {
    let id =
      input.id == 'elevation' || input.id == 'cadence' ? 'cad_ele' : input.id;
    const errorEl = document.querySelector(`.error__message--${id}`);
    errorEl.classList.add('error');
    errorEl.innerText = message;
  };
  removeError = input => {
    let id =
      input.id == 'elevation' || input.id == 'cadence' ? 'cad_ele' : input.id;
    const errorEl = document.querySelector(`.error__message--${id}`);
    errorEl.classList.remove('error');
  };
  // Check required fields
  checkRequired = input => {
    let isRequired = false;
    if (input.value.trim() === '') {
      this.showError(input, `${this.getFieldName(input)}  is  required !!`);
    } else {
      this.removeError(input);
      isRequired = true;
    }
    return isRequired;
  };
  //Check valid number input
  checkInput(input) {
    const regex = '^[1-9][0-9]*$';
    const InputValid = new RegExp(regex, 'g');
    if (!InputValid.test(`${input.value}`)) {
      this.showError(
        input,
        `${this.getFieldName(
          input
        )} must be Positive Number and not start with 0  !!`
      );
      return false;
    } else {
      this.removeError(input);
      return true;
    }
  }
  // Get fieldname
  getFieldName = input => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  };
  toggleElevationField = () => {
    this.#inputElevation
      .closest('.form__row')
      .classList.toggle('form__row--hidden');
    this.#inputCadence
      .closest('.form__row')
      .classList.toggle('form__row--hidden');
  };
  getInputvalue = () => {
    const inputValue = {};
    inputValue[this.#selection.id] = this.#selection.value;
    inputValue[this.#duration.id] = this.#duration.value;
    inputValue.type = this.#inputType.value;
    return inputValue;
  };
}
export default new formView();
