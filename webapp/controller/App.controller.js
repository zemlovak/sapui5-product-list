sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/Dialog",
  "sap/m/Button",
  "sap/m/Input",
  "sap/m/Label",
  "sap/ui/model/json/JSONModel"
], function (Controller, Dialog, Button, Input, Label, JSONModel) {
  "use strict";

  return Controller.extend("sapui5-product-list.controller.App", {
      onInit: function () {
          // Set sample data model
          var oModel = new JSONModel();
            oModel.loadData("./model/Products.json");
            this.getView().setModel(oModel, "products");
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
                      new Input({ value: "" })
                  ],
                  buttons: [
                      new Button({
                          text: "Add",
                          press: this.onAddProduct.bind(this)
                      }),
                      new Button({
                          text: "Cancel",
                          press: function () {
                              this.oDialog.close();
                          }.bind(this)
                      })
                  ]
              });
              this.getView().addDependent(this.oDialog);
          }
          this.oDialog.open();
      },
      onAddProduct: function () {
          sap.m.MessageToast.show("Product added to the list.");
          this.oDialog.close();
      }
  });
});
