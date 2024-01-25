import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const form = evt.target;
  const delay = Number(form.elements.delay.value);
  const radioBtn = form.elements.state.value;

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (radioBtn === 'fulfilled') {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay} ms`,
      });
    })

    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay} ms`,
      });
    });
  form.reset();
}
