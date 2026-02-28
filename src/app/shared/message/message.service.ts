import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: {
    type: 'success' | 'danger' | 'info' | 'warning';
    text: string;
    show: boolean;
  } = {
    type: 'success',
    text: '',
    show: false
  };

  private timeout: any;

  constructor() { }

    // Show success message (green)
  success(text: string) {
    this.show('success', text);
  }

  // Show error message (red)
  error(text: string) {
    this.show('danger', text);
  }

  // Show info message (blue)
  info(text: string) {
    this.show('info', text);
  }

  // Show warning message (yellow)
  warning(text: string) {
    this.show('warning', text);
  }

    // Private method to show message
  private show(type: any, text: string) {
    // Clear previous timeout
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    // Set message
    this.message = {
      type: type,
      text: text,
      show: true
    };

    // Auto hide after 5 seconds
    this.timeout = setTimeout(() => {
      this.message.show = false;
    }, 10000);
  }

  // Manually hide message
  hide() {
    this.message.show = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
