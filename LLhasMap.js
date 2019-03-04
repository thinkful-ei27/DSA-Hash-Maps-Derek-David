'use strict';

const LinkedList = require('./linkedList');

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const node = this._findNode(key);
    if (node === null) {
      throw new Error('Key error');
    } else {
      return node.value;
    }
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      this._slots[index] = new LinkedList();
    }
    if (this._findNode(key) === null) {
      this.length++;
      this._slots[index].insertLast({ key, value, deleted: false });
    } else {
      const node = this._slots[index].find(key);
      node.value = { key, value, deleted: false };
    }
  }

  remove(key) {
    const index = this._findSlot(key);
    this._slots[index].remove(key);
  }

  _findNode(key) {
    const index = this._findSlot(key);
    return this._slots[index] !== undefined ? this._slots[index].find(key) : null;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    return hash % this._capacity;
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        let currNode = slot.head;
        while (currNode !== null) {
          this.set(currNode.value.key, currNode.value.value);
          currNode = currNode.next;
        }
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const lor = new HashMap();
lor.set('Hobbit', 'Bilbo');
lor.set('Hobbit', 'Frodo');
lor.set('Wizard', 'Gandalf');
lor.set('Human', 'Aragon');
lor.set('Elf', 'Legolas');
lor.set('Maiar', 'The Necromancer');
lor.set('Maiar', 'Sauron');
lor.set('RingBearer', 'Gollum');
lor.set('LadyOfLight', 'Galadriel');
lor.set('HalfElven', 'Arwen');
lor.set('Ent', 'Treebeard');

console.log(lor.get('Maiar'));