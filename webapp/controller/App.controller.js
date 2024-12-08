sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/Label",
  ],
  function (Controller, ODataModel, Dialog, Button, Input, Label) {
    "use strict";

    return Controller.extend("sapui5-product-list.controller.App", {
      onInit: function () {
        // Initialize ODataModel with the service root URL
        var oModel = new ODataModel("/odata/");
        this.getView().setModel(oModel, "odataModel");
        if (oModel) {
          // Attach metadata events
          oModel.attachMetadataLoaded(function () {
            console.log("OData metadata loaded successfully.");
          });

          oModel.attachMetadataFailed(function (oEvent) {
            console.error(
              "Failed to load OData metadata:",
              oEvent.getParameters()
            );
          });
        } else {
          console.error("OData model 'odataModel' is not available.");
        }
      },

      onOpenAddDialog: function () {
        if (!this.oDialog) {
          this.oDialog = new Dialog({
            title: "Add Product",
            content: [
              new Label({ text: "Name" }),
              new Input({ value: "" }),
              new Label({ text: "Price" }),
              new Input({ value: "" }),
              new Label({ text: "Rating" }),
              new Input({ value: "" }),
            ],
            buttons: [
              new Button({
                text: "Add",
                press: this.onAddProduct.bind(this),
              }),
              new Button({
                text: "Cancel",
                press: function () {
                  this.oDialog.close();
                }.bind(this),
              }),
            ],
          });
          this.getView().addDependent(this.oDialog);
        }
        this.oDialog.open();
      },

      onAddProduct: function () {
        sap.m.MessageToast.show("Product added to the list.");
        this.oDialog.close();
      },
    });
  }
);
