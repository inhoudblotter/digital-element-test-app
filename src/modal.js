export class Modal {
  constructor(openBtn, container, closeBtn) {
    this.element = document.querySelector(`.${container}`);
    this.openBtnEl = document.querySelector(`.${openBtn}`);
    this.closeBtns = [];
    if (Array.isArray(closeBtn)) {
      closeBtn.forEach((btn) => {
        this.closeBtns.push(document.querySelector(`.${btn}`));
      });
    } else this.closeBtns.push(document.querySelector(`.${closeBtn}`));
    if (this.openBtnEl)
      this.openBtnEl.addEventListener("click", () => this.switch());
    this.closeBtns.forEach((btn) => {
      btn.addEventListener("click", () => this.close());
    });
    this.element.addEventListener("click", (e) => this.closeByClickOutside(e));
  }
  closeByClickOutside(e) {
    if (e.target === this.element) this.close();
  }
  switch() {
    if (this.element.classList.contains(`popup--open`)) {
      this.close();
    } else this.open();
  }
  close() {
    this.element.classList.remove(`popup--open`);
    document.body.classList.remove("stop-scroll");
  }
  open() {
    this.element.classList.add(`popup--open`);
    document.body.classList.add("stop-scroll");
  }
}
