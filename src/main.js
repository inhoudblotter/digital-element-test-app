import { Modal } from "./modal";
import { Form } from "./form";

(() =>
  window.addEventListener("DOMContentLoaded", () => {
    new Modal("burger", "nav", "nav__close-btn");
    new Modal("call-to-action__btn", "contact-form", [
      "contact-form__close-btn",
      "success-modal__btn",
    ]);
    const successModal = new Modal(null, "success-modal", "success-modal__btn");
    new Form(
      "contact-form",
      {
        "contact-form__name": {
          required: {
            message: "You need to fill in your name.",
          },
          length: {
            min: 3,
            max: 20,
            message:
              "The length of the name must be more than 3 and not exceed 20 characters.",
          },
        },
        "contact-form__mail": {
          required: {
            message: "You need to fill in your email.",
          },
          length: {
            min: 3,
            max: 20,
            message:
              "The length of the email must be more than 3 and not exceed 20 characters.",
          },
          pattern: {
            regexp: /(\d|[A-Za-z]|_|-)+@(\d|[A-Za-z]|_|-)+\.([a-z])+/,
            message: "Please enter a valid email.",
          },
        },
        "contact-form__message": {
          length: {
            max: 200,
            message: "The message must not exceed 200 characters.",
          },
        },
      },
      () => successModal.open()
    );
  }))();
