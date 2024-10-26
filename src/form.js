import { validate } from "./validation";

function Error(container, errorMessage) {
  const el = document.createElement("span");
  el.classList.add(`${container}__error`);
  el.textContent = errorMessage;
  return el;
}

export class Form {
  constructor(container, validation, successCallback, errorCallback) {
    this.containerEl = document.querySelector(`.${container}`);
    this.fields = this.containerEl.querySelectorAll("input, textarea");
    this.fields.forEach((field) => {
      field.addEventListener("input", () => {
        this.deleteError(field.id, this.containerEl);
      });
    });
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.validation = validation;
    this.containerEl.addEventListener("submit", (e) => this.onSubmit(e));
  }
  async onSubmit(e) {
    e.preventDefault();
    let passed = true;
    const values = {};
    for (const field of this.fields) {
      if (field.id in this.validation) {
        this.deleteError(field.id, this.containerEl);
        const error = validate(field.value, this.validation[field.id]);
        console.log(error);
        if (error) {
          passed = false;
          field.classList.add("form-field__input--error");
          field.insertAdjacentElement("afterend", Error("form-field", error));
        } else values[field.name] = field.value;
      }
    }
    if (passed) {
      const res = await fetch(
        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
      );
      if (res.ok && this.successCallback) {
        this.successCallback();
      } else if (this.errorCallback) {
        this.errorCallback(res.status);
      }
    }
  }
  deleteError(id) {
    const _input = this.containerEl.querySelector(`#${id}`);
    _input.classList.remove(`form-field__error`);
    const error = this.containerEl.querySelector(`#${id} + .form-field__error`);
    if (error) error.remove();
  }
}
