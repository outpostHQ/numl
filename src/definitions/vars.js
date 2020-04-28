import NuDefinition from './definition';

export default class NuVars extends NuDefinition {
  static get nuTag() {
    return 'nu-vars';
  }

  nuInit() {
    super.nuInit();

    const observer = new MutationObserver(() => this.nuApply());

    observer.observe(this, {
      characterData: false,
      attributes: true,
      childList: false,
      subtree: false
    });
  }

  nuConnected() {
    super.nuConnected();

    this.nuApply();
  }

  nuApply() {
    const parent = this.parentNode;

    const vars = this.nuOwnAttrs;

    if (JSON.stringify(this.nuVars) === JSON.stringify(vars)) return;

    if (this.nuVars) {
      Object.keys(this.nuVars).forEach((varName) => {
        parent.nuRemoveVar(varName);
      });
    }

    this.nuVars = vars;

    Object.entries(vars).forEach(([varName, varValue]) => {
      parent.nuSetVar(varName, varValue, this);
    });

    parent.nuVerifyChildren({ vars: true, shadow: true });
  }
}
