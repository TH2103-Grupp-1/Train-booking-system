import { Notyf } from 'notyf';

export function notyfFactory(): Notyf {
  return new Notyf({
    duration: 5000 // Set your global Notyf configuration here
  });
}
