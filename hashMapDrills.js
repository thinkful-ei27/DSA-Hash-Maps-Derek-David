'use strict';

// Create a HashMap class
class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key === key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
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

// const lor = new HashMap();
// lor.set('Hobbit', 'Bilbo');
// lor.set('Hobbit', 'Frodo');
// lor.set('Wizard', 'Gandalf');
// lor.set('Human', 'Aragon');
// lor.set('Elf', 'Legolas');
// lor.set('Maiar', 'The Necromancer');
// lor.set('Maiar', 'Sauron');
// lor.set('RingBearer', 'Gollum');
// lor.set('LadyOfLight', 'Galadriel');
// lor.set('HalfElven', 'Arwen');
// lor.set('Ent', 'Treebeard');

// console.log(lor.get('Maiar'));

// Any permutation a palindrome
const permPalindrome = string => {
  string = string.toLowerCase();
  // Can also use `new Map()` to make things a lot easier
  const letters = new HashMap();
  for (let i = 0; i < string.length; i++) {
    try {
      let count = letters.get(string[i]);
      letters.set(string[i], ++count);
    } catch (err) {
      letters.set(string[i], 1);
    }
  }
  // console.log(letters);
  const isEven = string.length % 2 === 0;
  if (isEven) {
    for (let j = 0; j < string.length; j++) {
      const num = letters.get(string[j]);
      if (num % 2 !== 0) {
        return false;
      }
    }
    return true;
  } else {
    let count = 0;
    for (let k = 0; k < string.length; k++) {
      const num = letters.get(string[k]);
      if (num % 2 !== 0) {
        count++;
      }
    }
    if (count > 1) {
      return false;
    } else {
      return true;
    }
  }
};

// console.log(permPalindrome('acecarr'));
// console.log(permPalindrome('abted'));
// console.log(permPalindrome('aeea'));
// console.log(permPalindrome('north'));

// Anagram grouping
const groupAnagrams = words => {
  const groups = new Map();
  const groupArr = [];

  words.forEach(word => {
    const sortedWord = word.split('').sort().join('');
    let currVal = groups.get(sortedWord);
    if (currVal === undefined) {
      groups.set(sortedWord, [word]);
    } else {
      const newArr = [...currVal, word];
      groups.set(sortedWord, newArr);
    }
  });

  for (let value of groups.values()) {
    groupArr.push(value);
  }

  return groupArr;
};

// console.log(groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
// Expect output to be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]
