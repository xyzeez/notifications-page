// Elements
const notifications = document.querySelectorAll('.notification');
const notificationCount = document.querySelector('.notifications__count');
const notificationBtn = document.querySelector('.notifications__btn');
const notificationList = document.querySelector('.notifications__list');

class NotificationApp {
  #notifications = [];
  #unreadNotificationCount = 0;

  constructor() {
    this.initNotifications();
    this.setUnreadCount();
    this.monitorNotifications();
    this.monitorMarkAllBtn();
  }

  initNotifications() {
    notifications.forEach((elem) => {
      const notification = new Notification(elem);
      this.#notifications.push(notification);
    });
  }

  setUnreadCount() {
    this.#unreadNotificationCount = 0;
    this.#notifications.forEach((notification) => {
      if (notification.status === 'unread') {
        this.#unreadNotificationCount++;
      }
    });
    this.updateNotificationCount();
  }

  updateNotificationCount() {
    notificationCount.textContent = this.#unreadNotificationCount;
  }

  monitorNotifications() {
    notificationList.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target.closest('.notification');
      this.setElementStatus(target);
      this.updateStatusData();
      this.setUnreadCount();
    });
  }

  setElementStatus(target) {
    if (target.getAttribute('data-status') === 'unread') {
      target.setAttribute('data-status', 'read');
    }
  }

  updateStatusData() {
    this.#notifications.forEach((notification) => {
      notification.updateStatus();
    });
  }

  monitorMarkAllBtn() {
    notificationBtn.addEventListener('click', () => {
      this.setAllRead();
      this.setUnreadCount();
    });
  }

  setAllRead() {
    this.#notifications.forEach((notification) => {
      notification.status = 'read';
    });
  }
}

class Notification {
  #element;
  #status;

  constructor(notification) {
    this.#element = notification;
    this.updateStatus();
  }

  set status(status) {
    this.#status = status;
    this.#element.setAttribute('data-status', status);
  }

  get status() {
    return this.#status;
  }

  updateStatus() {
    this.#status = this.#element.getAttribute('data-status');
  }
}

const app = new NotificationApp();
