sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/odata/v2/ODataModel",
  "sap/m/MessageToast",
  "sap/ui/core/Fragment"
], function (Controller, ODataModel, MessageToast, Fragment) {
  "use strict";

  return Controller.extend("sapui5-product-list.controller.App", {
      onInit: function () {
          // Initialize ODataModel
          var oModel = new ODataModel("/odata/", {useBatch: false});
          this.getView().setModel(oModel, "odataModel");
      },

      // Add product btn callback
      onOpenAddDialog: function () {
          if (!this._oDialog) {
              // Load the Dialog fragment
              Fragment.load({
                  name: "sapui5-product-list.view.addproduct",
                  controller: this
              }).then(function (oDialog) {
                  this._oDialog = oDialog;
                  this.getView().addDependent(this._oDialog);
                  this._oDialog.open();
              }.bind(this));
          } else {
              this._oDialog.open();
          }
      },

      // Save btn callback
      onSaveProduct: function () {
          var oModel = this.getView().getModel("odataModel");

          // Get input values
          var sName = sap.ui.getCore().byId("nameInput").getValue();
          var sPrice = parseFloat(sap.ui.getCore().byId("priceInput").getValue());
          var iRating = parseInt(sap.ui.getCore().byId("ratingInput").getValue(), 10);

          if (!sName || isNaN(sPrice) || isNaN(iRating)) {
              MessageToast.show("Please fill in all fields with valid values.");
              return;
          }

          // Create the product payload
          var oNewProduct = {
            ID: Math.floor(Math.random() * 100000), 
            Name: sName,
            Price: parseFloat(sPrice).toFixed(2),
            Rating: iRating
        };

          // UX validation
          oModel.create("/Products", oNewProduct, {
              success: function () {
                  MessageToast.show("Product added successfully!");
              },
              error: function (oError) {
                  MessageToast.show("Failed to add product.");
                  console.error("Error:", oError);
              }
          });

          this._oDialog.close();
      },

      // Cancel btn callback
      onCancelDialog: function () {
          if (this._oDialog) {
              this._oDialog.close();
          }
      }
  });
});
