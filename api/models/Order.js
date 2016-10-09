/**
 * Order.js
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
  	nameOrder: {
  		type: 'string',
		required: true
  	},
  	phoneOrder: {
  		type: 'string',
  		required: true
  	},
  	emailOrder: {
  		type: 'string',
  		email: true,
		required: true
  	},
    houseOrder: {
      type: 'string',
		required: true
    },
  	streetOrder: {
  		model: 'cate'
  	},
   	wardOrder: {
  		type: 'string',
		required: true
  	},
  	districtOrder: {
  		type: 'string',
		required: true
  	},
  	cityOrder: {
  		type: 'string',
		required: true
  	}
  }
};

