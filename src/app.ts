import * as ko from "knockout";
import * as oj from "ojs/ojcore";
import "jquery";
import "ojs/ojknockout";
import "ojs/ojmodule";
import "ojs/ojrouter";

export class App {
  public static debug: boolean = false;

  public router = oj.Router.rootInstance;

  constructor() {
    // Initialize Oracle Jet router
    if (App.debug) oj.Logger.option("level", oj.Logger.LEVEL_INFO);
    oj.Router.defaults["urlAdapter"] = new oj.Router.urlParamAdapter();
    oj.ModuleBinding.defaults.viewPath = "text!modules/";
    oj.ModuleBinding.defaults.modelPath = "modules/";

    this.router.configure({
      Main: { label: "Main", value: "Main/Main", isDefault: true }
    });

    oj.Router.sync().then(
      () => {
        ko.applyBindings(this, document.body);
      },
      err => {
        oj.Logger.error("Error in root start: " + err.message);
      }
    );
  }
}
