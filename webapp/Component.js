sap.ui.define([
    "sap/ui/core/UIComponent"
 ], (UIComponent) => {
    "use strict";
 
    return UIComponent.extend("sapui5-product-list.Component", {
        metadata : {
           "interfaces": ["sap.ui.core.IAsyncContentCreation"],
           "rootView": {
              "viewName": "sapui5-product-list.view.App",
              "type": "XML",
              "id": "app"
           }
        },

       init() {
          // call the init function of the parent
          UIComponent.prototype.init.apply(this, arguments);
       }
    });
 });
 