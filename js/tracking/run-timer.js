
class RunTimer {

  constructor() {
    this.startTime = null;
    this.endTime = null;
  }

  start() {
    this.startTime = performance.now();
    this.endTime = null;
  }

  stop() {
    if (this.endTime === null) {
      this.endTime = performance.now();
    }
  }

  getElapsedSeconds() {
    const end = this.endTime ?? performance.now();
    if (this.startTime === null) return 0;
    return (end - this.startTime) / 1000;
  }

  reset() {
    this.startTime = null;
    this.endTime = null;
  }
}

export { RunTimer };