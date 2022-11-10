import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

let formData = {};

populateData();

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;
  const submitData = { email: email.value, message: message.value };
  if (email.value && message.value) {
    console.log(submitData);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}

function populateData() {
  const savedDataParsed = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!savedDataParsed) {
    return;
  }
  formData = savedDataParsed;
  form.email.value = formData.email || '';
  form.message.value = formData.message || '';
}

