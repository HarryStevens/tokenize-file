# tokenize-file
[![Build Status](https://travis-ci.org/HarryStevens/tokenize-file.svg?branch=master)](https://travis-ci.org/HarryStevens/tokenize-file) [![Coverage Status](https://coveralls.io/repos/github/HarryStevens/tokenize-file/badge.svg?branch=master)](https://coveralls.io/github/HarryStevens/tokenize-file?branch=master)

Read a file, tokenize it, and spit out a handy JSON.

## Installation

```bash
npm i tokenize-file -S
```

## Example

```js
var tokenizeFile = require("tokenize-file");

tokenizeFile("path/to/file.txt", tokens => {
  console.log(tokens.filter(d => !d.stop_word && d.pos !== "N"));
});
```

## API

<a name="tokenizeFile" href="#tokenizeFile">#</a> <b>tokenizeFile</b>(<em>path/to/file_name</em>, <em>callback</em>)

Read a file, tokenize it, and spit out the JSON of the tokens. The tokenized data is passed as an array of objects to the callback function. In the array, each token is an object, represented as:
```
{
  value: "String", // the token
  count: Number, // the number of times it appears in the file
  pos: "String" // the token's Penn Treebank POS tag,
  stop_word: Boolean // whether the token value is a stop word, which can be filtered out in some analyses
}
```

`tokenizeFile` can read any type of file supported by [textract](https://github.com/dbashford/textract):
* HTML, HTM
* ATOM, RSS
* Markdown
* XML, XSL
* PDF
* DOC, DOCX
* ODT, OTT (experimental, feedback needed!)
* RTF
* XLS, XLSX, XLSB, XLSM, XLTX
* CSV
* ODS, OTS
* PPTX, POTX
* ODP, OTP
* ODG, OTG
* PNG, JPG, GIF
* DXF
* `application/javascript`
* All `text/*` mime-types.

The POS tags are:

| POS Tag | Description | Example |
| --- | --- | --- |
| CC | coordinating conjunction | and |
| CD | cardinal number | 1, third |
| DT | determiner | the |
| EX | existential there | there is |
| FW | foreign word | d’hoevre |
| IN | preposition/subordinating conjunction | in, of, like |
| JJ | adjective | big |
| JJR | adjective, comparative | bigger |
| JJS | adjective, superlative | biggest |
| LS | list marker | 1) |
| MD | modal | could, will |
| NN | noun, singular or mass | door |
| NNS | noun plural | doors |
| NNP | proper noun, singular | John |
| NNPS | proper noun, plural | Vikings |
| PDT | predeterminer | both the boys |
| POS | possessive ending | friend‘s |
| PRP | personal pronoun | I, he, it |
| PRP$ | possessive pronoun | my, his |
| RB | adverb | however, usually, naturally, here, good |
| RBR | adverb, comparative | better |
| RBS | adverb, superlative | best |
| RP | particle | give  up  |
| TO | to | to go, to him |
| UH | interjection | uhhuhhuhh |
| VB | verb, base form | take |
| VBD | verb, past tense | took |
| VBG | verb, gerund/present participle | taking |
| VBN | verb, past participle | taken |
| VBP | verb, sing. present, non-3d | take |
| VBZ | verb, 3rd person sing. present | takes |
| WDT | wh-determiner | which |
| WP | wh-pronoun | who, what |
| WP$ | possessive wh-pronoun | whose |
| WRB | wh-abverb | where, when |