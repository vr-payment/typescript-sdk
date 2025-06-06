"use strict";

import { expect } from "chai";
import http from "http";
import { VRPayment as Whitelabel } from "../index";
import {
    ApiConfig,
    getTransactionCreate
} from "./constants";
import model = Whitelabel.model;

const {
    TransactionPaymentPageService,
    TransactionService
} = Whitelabel.api;

type Transaction = model.Transaction;

const transactionPaymentPageService = new TransactionPaymentPageService(ApiConfig);
const transactionService = new TransactionService(ApiConfig);

describe("TransactionPaymentPageService", () => {
    describe("paymentPageUrl()", () => {
        it("should create payment page URL", (done) => {
            transactionService.create(ApiConfig.space_id, getTransactionCreate())
                .then((response: { response: http.IncomingMessage, body: Transaction }) => {
                    const transactionId = response.body.id as number;
                    return transactionPaymentPageService.paymentPageUrl(ApiConfig.space_id, transactionId);
                })
                .done((response: { response: http.IncomingMessage, body: string }) => {
                    const paymentPageUrl = response.body;
                    expect(paymentPageUrl).to.include("https://");
                    expect(paymentPageUrl).to.include("securityToken");
                    done();
                });
        });
    });
});
