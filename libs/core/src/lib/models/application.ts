import {Event, LifecycleEvent, MessageEvent, NavigationEvent} from './events';

export type Listener<T extends Event> = (event: T) => void;

export abstract class Application<T = void> {
  isBootstrapped = false;
  isDestroyed = true;
  container: string | Element;

  protected readonly hook = new Set<Listener<LifecycleEvent>>();
  protected readonly message = new Set<Listener<MessageEvent>>();
  protected readonly navigationEvent = new Set<Listener<NavigationEvent>>();

  // todo: заспекать типы props
  constructor(public readonly name: string, public props?: T) {}

  onMessage(fn: Listener<MessageEvent>): () => void {
    this.message.add(fn);

    return () => {
      this.message.delete(fn);
    };
  }

  emitMessage(event: MessageEvent) {
    this.callListeners(this.message, event);
  }

  onRouteChange(fn: Listener<NavigationEvent>): () => void {
    this.navigationEvent.add(fn);

    return () => {
      this.navigationEvent.delete(fn);
    };
  }

  emitRouteChange(event: NavigationEvent) {
    this.callListeners(this.navigationEvent, event);
  }

  onHook(fn: Listener<LifecycleEvent>): () => void {
    this.hook.add(fn);

    return () => {
      this.hook.delete(fn);
    };
  }

  emitHook(event: LifecycleEvent) {
    this.callListeners(this.hook, event);
  }

  // todo: намутить контекст выполнения и пока что запретить
  // вызывать метод напрямую
  // иначе хранение забутстрапенных прил будет невозможным
  destroy() {
    this.hook.clear(); // todo: в этот поток перед комплитом нужен евент дестроя
    this.message.clear();
    this.navigationEvent.clear();

    this.isBootstrapped = false;
    this.isDestroyed = true;
  }

  // todo: см. Application#destroy
  async bootstrap(container: string | Element, _props?: T): Promise<void> {
    this.isBootstrapped = true;
    this.container = container;
  }

  abstract send(msg: string | MessageEvent): Promise<void>;

  // todo: шо за пропс? Надо придумать
  abstract navigate(url: string, props?: unknown): Promise<void>;

  protected callListeners<K extends Event>(listeners: Set<Listener<K>>, event: K) {
    [...listeners].forEach(fn => {
      fn(event);
    });
  }
}

export interface ApplicationConstructor<T = void> {
  new (name: string, props?: T): Application<T>;
}
