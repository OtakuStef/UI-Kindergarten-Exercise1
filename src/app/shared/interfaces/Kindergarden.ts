export interface Kindergarden {
    id: number;
    name: string;
    address: string;
    betreiber: string;
    typ: Typ,
    email : string,
    telNr: string,
    besuchsmodell:string[],
    essen:number,
    img:string
  }

  export enum Typ {
      privat = 1,
      oeffentlich = 2,
  }