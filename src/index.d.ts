import { EventEmitter } from 'events';

declare interface IHerokuCaffeineConstructorProperties {
  interval?: number;
  urls: string[];
  fetchOptions?: RequestInit;
}

declare class HerokuCaffeine {
  public interval: number;

  public urls: string[];

  public fetchOptions: RequestInit;

  public ids: NodeJS.Timeout[];

  public eventBus: EventEmitter;

  constructor({
    interval,
    urls,
    fetchOptions,
  }: IHerokuCaffeineConstructorProperties);

  public run(): void;

  public stop(): void;

  public intervalMainFunction(): Promise<void>;
}

declare module 'heroku-caffeine' {
  export default HerokuCaffeine;
}
