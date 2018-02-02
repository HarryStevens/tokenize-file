"use strict";

var expect = require("chai").expect;
var tokenizeFile = require("../index");
var fs = require("fs");

describe("#tokenizeFile", function() {

	// test for errors
  it("should throw errors if arguments are blank or are the wrong data types", function() {
    expect(function(){ tokenizeFile() }).to.throw(Error);
    expect(function(){ tokenizeFile("index.js") }).to.throw(Error);
    expect(function(){ tokenizeFile(["index.js"], function(){}) }).to.throw(Error);
    expect(function(){ tokenizeFile("index.js", ["index.js"]) }).to.throw(Error);
  });

  it("should read and tokenize a file", function(){
  	tokenizeFile("test/input.txt", function(tokens){
  		expect(tokens.length !== 0).to.equal(true);
  	});

  });

});