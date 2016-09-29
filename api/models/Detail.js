/**
 * Detail.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	nameprd: {
  		type: 'string',
  		required: true
  	},
  	price: {
  		type: 'integer',
  		required: true
  	},
  	image: {
  		type: 'string',
		defaultsTo: ''
  	},
  	descrice: {
  		type: 'string',
  		defaultsTo: ''
  	},
  	number: {
  		type: 'integer'
  	},
    cateprd: {
      type: 'string',
    },
    
  	owner: {
  		model: 'cate'
  	}
  }
};

