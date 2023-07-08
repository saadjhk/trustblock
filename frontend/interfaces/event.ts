export enum EventCities {
    Paris = 'paris',
    NewYork = 'newyork',
    Istanbul = 'istanbul',
    London = 'london',
    Madrid = 'madrid',
    Tokyo = 'tokyo',
    Dubai = 'dubai',
    Blida = 'blida',
    Wakanda = 'wakanda',
    Gotham = 'gotham',
  }
  

export interface EEvent {
    name: string;
    id: string;
    description: string;
    date: Date;
    city: EventCities;
}