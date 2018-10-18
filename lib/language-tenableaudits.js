'use babel';

import LanguageTenableauditsView from './language-tenableaudits-view';
import { CompositeDisposable } from 'atom';

export default {

  languageTenableauditsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageTenableauditsView = new LanguageTenableauditsView(state.languageTenableauditsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageTenableauditsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-tenableaudits:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageTenableauditsView.destroy();
  },

  serialize() {
    return {
      languageTenableauditsViewState: this.languageTenableauditsView.serialize()
    };
  },

  toggle() {
    console.log('LanguageTenableaudits was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
