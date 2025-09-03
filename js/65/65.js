'use strict';

(function () {

    //a
    function bankAccountCreator() {
        return {
            balance: 0,
            performTransaction(amount) {
                this.balance += amount;
            }
        };
    }

    const account1 = bankAccountCreator();
    const account2 = bankAccountCreator();



    //b
    const transaction = account1.performTransaction;

    transaction.call(account2, 100);
    transaction.apply(account2, [25]);



    //c
    const depositFiftyInAccount2 = transaction.bind(account2, 50);

    depositFiftyInAccount2();



}());