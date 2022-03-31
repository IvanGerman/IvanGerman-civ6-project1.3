class SelectTeamCivs {
  constructor() {
    console.log('SelectTeamCivs');
    this.words = ['a', 'b', 'c'];
    this.render();
  }

  async render() {
    const word = this.createWord();
    document.getElementById('root').appendChild(word);
  }

  createWord() {
    const word = document.createElement('div');
    word.style.position = 'absolute';
    word.style.top = '55%';
    word.style.left = '50%';
    word.style.transform = 'translateX(-50%)';
    word.innerHTML = this.words[0].word;
    return word;
  }
}

export default SelectTeamCivs;
