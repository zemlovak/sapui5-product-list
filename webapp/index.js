sap.ui.define([
	"sap/ui/core/mvc/XMLView"
], (XMLView) => {
	"use strict";

	XMLView.create({
		viewName: "sapui5-product-list.view.App"
	}).then((oView) => oView.placeAt("content"));
});