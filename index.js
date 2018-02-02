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

  // stop words
  var stop_words = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now", "d", "ll", "m", "o", "re", "ve", "y", "ain", "aren", "couldn", "didn", "doesn", "hadn", "hasn", "haven", "isn", "ma", "mightn", "mustn", "needn", "shan", "shouldn", "wasn", "weren", "won", "wouldn"];

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

    tokens_count.forEach(token => {
      token.pos = tagger.tag([token.value])[0][1]; // get the part of speech for each token
      token.stop_word = stop_words.indexOf(token.value) !== -1; // is it a stop word?
      return token;
    });

    // the callback function
    callback(tokens_count);

  });
}