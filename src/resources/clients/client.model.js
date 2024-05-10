import { v4 as uuid } from 'uuid';

export default class Client {
  constructor({ id = uuid(), 
    name = 'CLIENT', 
    adress = 'client',
    bonucecard = '5@35',
    numberphone = 'number' 
  } = {}) {
    this.id = id;
    this.name = name;
    this.adress = adress;
    this.bonucecard = bonucecard;
    this.numberphone = numberphone;
  }

  static toResponse(client) {
    const { id, name, adress, bonucecard, numberphone} = client;
    return { id, name, adress, bonucecard, numberphone};
  }
}
