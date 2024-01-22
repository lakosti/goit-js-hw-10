import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let userSelectedDate = selectedDates[0];
    if (userSelectedDate >= options.defaultDate) {
      btn.disabled = false;
      iziToast.success({
        title: 'OK',
        message: 'Successfully!',
        position: 'topCenter',
      });
    } else {
      iziToast.error({
        title: 'Error',
        message: '"Please choose a date in the future"',
        position: 'topCenter',
      });
    }
  },
};
flatpickr(input, options);
btn.addEventListener('click', onclick);

function onclick() {
  btn.disabled = true;
  input.disabled = true;
  const timeoutId = setInterval(() => {
    const date = new Date();
    const dateInFuture = new Date(input.value);
    const diff = dateInFuture - date;

    const { days, hours, minutes, seconds } = convertMs(diff);

    day.textContent = days.toString().padStart(2, '0');
    hour.textContent = hours.toString().padStart(2, '0');
    minute.textContent = minutes.toString().padStart(2, '0');
    second.textContent = seconds.toString().padStart(2, '0');

    if (!minutes && !seconds) {
      clearInterval(timeoutId);
      btn.disabled = false;
      input.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
