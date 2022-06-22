
//var stripe = Stripe("pk_test_51Hu7pgLBq3dPUhAo27pXj0v7AtzgJSPPALVSkaHKQngzZfGEm561MESrpUAmYSmQbbolVsAi4NuGChldkhoI12IN00CxpjgXee");
var stripe = Stripe("pk_test_51HpYRiJF6lJpcd14z4kOFwfZmEIg4UMLooWtAkai6okk5NIfngSM63uYJtMGr8jy0aNHGrhkUreUjTlIa6cJsWfy00kdJyVpx8");
//var CreateStripeToken = function (accountNumber, routingNumber, accountHolderName) {
//    var stripeResult = {};
    
//    stripe.createToken('bank_account', {
//        country: 'US',
//        currency: 'usd',
//        routing_number: routingNumber,
//        account_number: accountNumber,
//        account_holder_name: accountHolderName,
//        account_holder_type: 'individual',
//    })
//    .then(function (result) {
//        stripeResult = result;
//        console.log(result)
//        console.log("Hit success Part A");
//    });
//    return stripeResult;
//}

//Global 
//var stripe = Stripe("pk_test_51Hu7pgLBq3dPUhAo27pXj0v7AtzgJSPPALVSkaHKQngzZfGEm561MESrpUAmYSmQbbolVsAi4NuGChldkhoI12IN00CxpjgXee")

var CreateStripeToken = function (accountNumber, routingNumber, accountHolderName) {
var stripeResult = {};
const PromiseE = new Promise((resolve, reject) => {

   
    setTimeout(function () {
        resolve(stripe
        .createToken('bank_account', {
            country: 'US',
            currency: 'usd',
            routing_number: routingNumber,
            account_number: accountNumber,
            account_holder_name: accountHolderName,
            account_holder_type: 'individual',
        }));
    }, 1);
});

PromiseE.then(function (result) {
    console.log(result);
    stripeResult = result;
});
return stripeResult;
}




var CreateStripeToken = function (accountNumber, routingNumber, accountHolderName) {
    var stripeResult = {};
let promise = new Promise(resolve => {

    setTimeout(() => resolve(stripe
        .createToken('bank_account', {
            country: 'US',
            currency: 'usd',
            routing_number: routingNumber,
            account_number: accountNumber,
            account_holder_name: accountHolderName,
            account_holder_type: 'individual',
        })), 1000);

});

promise.then(function (result) {
    stripeResult = result;
    Token = result;
    console.log("Hit Part A")
});
return stripeResult;
}


