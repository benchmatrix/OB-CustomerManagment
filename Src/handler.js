'use strict';

module.exports.RandomNumber = async (event) => {
 const Number= parseInt(math.RandomNumber()*100);
 return Number;
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
