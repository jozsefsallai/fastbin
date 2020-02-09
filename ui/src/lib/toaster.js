import pull from 'lodash.pull';
import remove from 'lodash.remove';

class Toaster {
  constructor () {
    this.DEFAULT_TIMEOUT = 5000;

    this._i = 0;
    this._toasts = [];

    this._handlers = {
      create: [],
      dismiss: [],
      timeouts: []
    };
  }

  count () {
    return this._toasts.length;
  }

  all () {
    return this._toasts.slice(0);
  }

  at (idx) {
    return this._toasts[idx];
  }

  $on (evt, handler) {
    return this._handlers[evt].push(handler);
  }

  $off (evt, handler) {
    return pull(this._handlers[evt], handler);
  }

  $emit (evt, arg) {
    return this._handlers[evt].forEach(fn => fn(arg));
  }

  create (level, message, title = null, dismissable = true) {
    const allowedLevels = ['danger', 'info', 'warning', 'success'];
    if (!allowedLevels.includes(level)) {
      throw new Error(`Toaster.create invoked with invalid level=${level}`);
    }

    const newToast = {
      id: this._i++,
      level,
      message,
      title,
      dismissable
    };

    this._toasts.unshift(newToast);
    this.$emit('create', newToast);

    const timeoutRef = setTimeout(function () {
      this.destroy(newToast.id);
      return pull(this._handlers.timeouts, timeoutRef);
    }.bind(this), this.DEFAULT_TIMEOUT);

    this._handlers.timeouts.push(timeoutRef);

    return newToast;
  }

  destroy (id) {
    const removed = remove(this._toasts, { id });

    if (removed.length > 0) {
      return this.$emit('dismiss', removed[0]);
    }
  }

  destroyAllToasts () {
    this._i = 0;
    this._toasts.length = 0;
    this._handlers.create.length = 0;
    this._handlers.dismiss.length = 0;
    this._handlers.timeouts.forEach(ref => clearTimeout(ref));
    this._handlers.timeouts.length = 0;
  }
}

const toaster = new Toaster();

export default toaster;
