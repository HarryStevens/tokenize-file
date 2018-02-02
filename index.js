"use strict";

module.exports = function(input_file, callback){

  // handle errors

  // no input file
  if (!input_file) {
    throw new Error("You must specify an input file as the first argument.");
  }

  // no output file
  else if (input_file && !callback){
    throw new Error("You must specify an output file as the second argument.");  
  }

  // input file is not a string
  else if (input_file && typeof(input_file) !== "string") {
    throw new Error("The first argument must be a string.");
  }

  // output file is not a string
  else if (input_file && typeof(input_file) == "string" && callback && typeof(callback) !== "function") {
    throw new Error("The second argument must be a string.");
  }

  // dependencies
  var natural = require("natural");
  var path = require("path");
  var textract = require("textract");
  var jz = require("jeezy");

  // parts of speech variables
  var base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger");
  var rulesFilename = base_folder + "/data/English/tr_from_posjs.txt";
  var lexiconFilename = base_folder + "/data/English/lexicon_from_posjs.json";
  var defaultCategory = "N";

  // natural modules
  var lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
  var rules = new natural.RuleSet(rulesFilename);
  var tagger = new natural.BrillPOSTagger(lexicon, rules);
  var tokenizer = new natural.WordTokenizer();

  // extract the file
  textract.fromFileWithPath(input_file, (error, text) => {
    
    // get the tokens
    var tokens = tokenizer.tokenize(text).map(d => { return {token: d}; });

    // pivot the tokens
    var tokens_count = jz.arr.sortBy(jz.arr.pivot(tokens, "token"), "count", "desc");

    // get the part of speech for each token
    tokens_count.forEach(token => {
      token.pos = tagger.tag([token.value])[0][1];
      return token;
    });

    // the callback function
    callback(tokens_count);

  });
}