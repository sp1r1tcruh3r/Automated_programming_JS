// Alarmclock.js
import ClockState from './ClockState';

export default class AlarmClock {
  clockTime = { minutes: 0, hours: 12 };
  alarmTime = { minutes: 0, hours: 6 };
  alarmOn = false;

  constructor() {
    this.setState(ClockState);
  }

  clickMode() {
    this.state.nextState();
  }

  longClickMode() {
    this.alarmOn = !this.alarmOn;
  }

  clickH() {
    this.state.incrementH();
  }

  clickM() {
    this.state.incrementM();
  }

  tick() {
    this.incrementM('clockTime');
    if (this.clockTime.minutes === 0) {
      this.incrementH('clockTime');
    }
    this.state.tick();
  }

  isAlarmOn() {
    return this.alarmOn;
  }

  isAlarmTime() {
    return this.clockTime.minutes === this.alarmTime.minutes
      && this.clockTime.hours === this.alarmTime.hours;
  }

  minutes() {
    return this.clockTime.minutes;
  }

  hours() {
    return this.clockTime.hours;
  }

  alarmMinutes() {
    return this.alarmTime.minutes;
  }

  alarmHours() {
    return this.alarmTime.hours;
  }

  setState(Klass) {
    this.state = new Klass(this);
  }

  getCurrentMode() {
    return this.state.getModeName();
  }

  incrementH(timeType) {
    const data = this[timeType];
    data.hours = (data.hours + 1) % 24;
  }

  incrementM(timeType) {
    const data = this[timeType];
    data.minutes = (data.minutes + 1) % 60;
  }
}
// END

//alarmstate.js
// BEGIN
import State from './State';
import ClockState from './ClockState';
import BellState from './BellState';

export default class AlarmState extends State {
  mode = 'alarm';
  timeType = 'alarmTime';
  NextStateClass = ClockState;

  incrementH() {
    this.clock.incrementH(this.timeType);
  }

  incrementM() {
    this.clock.incrementM(this.timeType);
  }

  tick() {
    if (this.clock.isAlarmTime()) {
      this.nextState(BellState);
    }
  }
}
// END

//bellstate.js
// BEGIN
import ClockState from './ClockState';
import State from './State';

export default class BellState extends State {
  mode = 'bell';
  NextStateClass = ClockState;

  tick() {
    this.nextState();
  }

  incrementH() {
    return false;
  }

  incrementM() {
    return false;
  }
}
// END
//clockstate.js
// BEGIN
import State from './State';
import AlarmState from './AlarmState';
import BellState from './BellState';

export default class ClockState extends State {
  mode = 'clock';
  timeType = 'clockTime';
  NextStateClass = AlarmState;

  incrementH() {
    this.clock.incrementH(this.timeType);
  }

  incrementM() {
    this.clock.incrementM(this.timeType);
  }

  tick() {
    if (this.clock.isAlarmOn() && this.clock.isAlarmTime()) {
      this.nextState(BellState);
    }
  }
}
// END
//state.js
// BEGIN
export default class State {
  constructor(clock) {
    this.clock = clock;
  }

  nextState(StateKlass) {
    this.clock.setState(StateKlass || this.NextStateClass);
  }

  getModeName() {
    return this.mode;
  }
}
// END
