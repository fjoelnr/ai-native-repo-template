class ConversationMemory {
  constructor(limit = 3) {
    this.limit = limit
    this.shortTerm = []
    this.longTerm = new Map()
  }

  rememberEvent(entry) {
    this.shortTerm.push(entry)
    if (this.shortTerm.length > this.limit) {
      this.shortTerm.shift()
    }
  }

  promoteFact(key, value) {
    this.longTerm.set(key, value)
  }

  recallFact(key) {
    return this.longTerm.get(key)
  }

  getContextSnapshot() {
    return {
      shortTerm: [...this.shortTerm],
      longTerm: Object.fromEntries(this.longTerm.entries()),
    }
  }
}

module.exports = {
  ConversationMemory,
}
