/*

Order.js

Реализуйте и экспортируйте по умолчанию тип Order. Сделайте так, чтобы на каждое изменение состояния в массив history добавлялась запись об этом в виде { state: <name>, createdAt: new Date() }. Используйте для этого событие onEnterState библиотеки javascript-state-machine.

(Эта библиотека неявно проставляет состояние 'none' и делает переход в начальный стейт (в нашем случае -'init'). Нас эти состояния не интересуют, поэтому в 'history' их нужно избегать.)

Реализуйте конечный автомат процесса заказа товаров в магазине:

Начальное состояние: init. Событие accept переводит автомат в pending (только из init). Событие ship переводит в состояние shipped (только из pending). Событие complete переводит в состояние completed (только из shipped). Событие cancel переводит в состояние canceled (только из состояний init и pending) Событие refund переводит в состояние refunded (только из состояний shipped и completed)

Немного пояснения. Отменить заказ можно только до тех пор пока он не был отправлен клиенту. Если заказ уже был отправлен или доставлен, то клиент может сделать возврат. В реальной жизни на эти переходы будут происходить дополнительные действия связанные с обработкой платежа, отправки почты и тому подобное.
solution.js

Реализуйте функцию tryCancel которая выполняет отмену заказа только в том случае, если это возможно сделать.

import cancel from './solution';

const order = new Order([]);
order.is('canceled'); // false
tryCancel(order);
order.is('canceled'); // true

Это задание подразумевает то, что хорошо изучите документацию библиотеки. Все как в реальной жизни ;)
Подсказки

    State Machine Factory
    Lifecycle Events

*/

//solution.js
import Order from './Order';

export const init = items => new Order(items);

// BEGIN (write your solution here)
export const tryCancel = (order) => {
  if (order.can('cancel')) {
    order.cancel();
  }
};
// END
//ORDER.js
import StateMachine from 'javascript-state-machine';

export default class Order {
  constructor(items) {
    this.items = items;
    this.history = [];

    this._fsm(); // eslint-disable-line
  }
}

StateMachine.factory(Order, {
  init: 'init',
  transitions: [
    // BEGIN (write your solution here)
    { name: 'accept',  from: 'init',  to: 'pending' },
    { name: 'shipped',  from: 'pending', to: 'shipped '  },
    { name: 'complete', from: 'shipped', to: 'completed' },
    { name: 'cancel', from: [ 'init', 'pending' ],  to: 'canceled' },
    { name: 'refund', from: [ 'shipped', 'completed' ],  to: 'refunded' },
    // END
  ],
  methods: {
    // BEGIN (write your solution here)
   onEnterState({ from, to }) {
      if (from !== 'none') {
        this.history.push({ state: to, createdAt: new Date() });
      }
    },
    // END
  },
});
