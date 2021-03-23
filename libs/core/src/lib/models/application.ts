import {Observable, Subject} from 'rxjs';
import {LifecycleEvent, MessageEvent, NavigationEvent} from './events';

export abstract class Application<T = void> {
  isBootstrapped = false;
  isDestroyed = true;
  container: string | Element;

  // todo: все внешние интерфейсы лучше обезопасить
  // и отвязаться от Observable
  protected readonly _hook = new Subject<LifecycleEvent>();
  readonly hook$: Observable<LifecycleEvent> = this._hook.asObservable();
  protected readonly _message = new Subject<MessageEvent>();
  readonly message$: Observable<MessageEvent> = this._message.asObservable();
  protected readonly _navigationEvent = new Subject<NavigationEvent>();
  readonly navigationEvent$: Observable<NavigationEvent> = this._navigationEvent.asObservable();

  /// todo: заспекать типы props
  constructor(public readonly name: string, public props?: T) {}

  // todo: намутить контекст выполнения и пока что запретить
  // вызывать метод напрямую
  // иначе хранение забутстрапенных прил будет невозможным
  destroy() {
    this._hook.complete(); // todo: в этот поток перед комплитом нужен евент дестроя
    this._message.complete();
    this._navigationEvent.complete();

    this.isBootstrapped = false;
    this.isDestroyed = true;
  }

  // todo: см. Application#destroy
  bootstrap(container: string | Element, _props?: T) {
    this.isBootstrapped = true;
    this.container = container;
  }

  abstract send(msg: string | MessageEvent): Observable<void>;

  // todo: шо за пропс? Надо придумать
  abstract navigate(url: string, props?: unknown): Observable<void>;
}

export interface ApplicationConstructor<T = void> {
  new (name: string, props?: T): Application<T>;
}
