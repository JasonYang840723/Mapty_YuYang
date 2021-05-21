class dropdown {
  _containerWorkouts = document.querySelector('.workouts');
  _parentElemet = document.querySelector('.sidebar');
  addHandlerShowDropdown = handler => {
    this._containerWorkouts.addEventListener('click', e => {
      handler(e);
    });
  };
  addHandlerHideDropdown = handler => {
    this._parentElemet.addEventListener('click', e => {
      handler(e);
    });
  };
  addHandlerControlDropdown = handler => {
    this._parentElemet.addEventListener('click', e => {
      const dropdownItems = e.target.closest('.dropdown__items');
      if (dropdownItems) {
        handler(e, dropdownItems);
      }
    });
  };
  showDropdown = e => {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const dropdownExpand = e.target.closest('.workout__icon--expand');
    if (!dropdownExpand) return;
    //Hide dropdown from previous workout card
    this.hideDropdown();
    const dropdown = workoutEl.querySelector('.dropdown');
    dropdown.classList.remove('hidden');
    // const editItem = dropdown.querySelector('.edit');
    // const deleteItem = dropdown.querySelector('.delete');
  };
  hideDropdown = () => {
    const dropdownElements =
      this._containerWorkouts.querySelectorAll('.dropdown');
    if (!dropdownElements) return;
    dropdownElements.forEach(d => {
      if (d.classList.contains('hidden')) return;
      d.classList.add('hidden');
    });
  };
  hideDropdownClickOutside = e => {
    const dropdown = Array.from(
      this._parentElemet.querySelectorAll('.dropdown')
    );
    // prettier-ignore
    const isHidden = dropdown.every((d) => d.classList.contains('hidden'))
    const dropdownExpand = e.target.closest('.workout__icon--expand');
    const dropdownItems = e.target.closest('.dropdown__items');
    if (dropdownExpand || dropdownItems || isHidden) return;

    this.hideDropdown();
  };
}
export default new dropdown();
