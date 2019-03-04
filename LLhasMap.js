import LinkedList from './linkedList'
class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const node = this._findNode(key)
    if (node === null) {
      throw new Error('Key error');
    } else {
      return node.value
    }
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const getNode = this._findNode(key)
    if (getNode === null) {
      LL = new LinkedList()
      length++
    } else {
      getNode.insertLast({
        key,
        value,
        deleted: false
      })
    }
  }

  remove(key) {

  }
  
  _findNode(key) {
    const index = this._findSlot(key);
    return this._slots[index].find(key)
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