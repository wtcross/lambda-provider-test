"use strict";
var expect  = require("chai").expect;
var handler = require("../lib/handler");

describe("The handler", function () {
	it("is a function", function () {
		expect(handler).to.be.a("function");
	});
});
