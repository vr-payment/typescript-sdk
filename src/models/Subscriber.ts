'use strict';
import { Address } from "./Address";
import { CreationEntityState } from "./CreationEntityState";


class Subscriber {

        /**
        * Allow the subscriber to use these payment methods even if subscription products do not accept them.
        */
    'additionalAllowedPaymentMethodConfigurations'?: Array<number>;

        /**
        * The address associated with the subscriber for invoicing and transaction processing purposes.
        */
    'billingAddress'?: Address;

        /**
        * The description used to identify the subscriber.
        */
    'description'?: string;

        /**
        * Prevent the subscriber from using these payment methods even if subscription products do accept them.
        */
    'disallowedPaymentMethodConfigurations'?: Array<number>;

        /**
        * The email address that is used to communicate with the subscriber. There can be only one subscriber per space with the same email address.
        */
    'emailAddress'?: string;

        /**
        * A client generated nonce which identifies the entity to be created. Subsequent creation requests with the same external ID will not create new entities but return the initially created entity instead.
        */
    'externalId'?: string;

        /**
        * A unique identifier for the object.
        */
    'id'?: number;

        /**
        * The language that is used when communicating with the subscriber via emails and documents.
        */
    'language'?: string;

        /**
        * The ID of the space this object belongs to.
        */
    'linkedSpaceId'?: number;

        /**
        * Allow to store additional information about the object.
        */
    'metaData'?: { [key: string]: string; };

        /**
        * The date and time when the object is planned to be permanently removed. If the value is empty, the object will not be removed.
        */
    'plannedPurgeDate'?: Date;

        /**
        * The merchant's reference used to identify the subscriber.
        */
    'reference'?: string;

        /**
        * The address to where orders will be shipped.
        */
    'shippingAddress'?: Address;

        /**
        * The object's current state.
        */
    'state'?: CreationEntityState;

        /**
        * The version is used for optimistic locking and incremented whenever the object is updated.
        */
    'version'?: number;


    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    
        {
        "name": "additionalAllowedPaymentMethodConfigurations",
        "baseName": "additionalAllowedPaymentMethodConfigurations",
        "type": "Array<number>"
        },
        
        {
        "name": "billingAddress",
        "baseName": "billingAddress",
        "type": "Address"
        },
        
        {
        "name": "description",
        "baseName": "description",
        "type": "string"
        },
        
        {
        "name": "disallowedPaymentMethodConfigurations",
        "baseName": "disallowedPaymentMethodConfigurations",
        "type": "Array<number>"
        },
        
        {
        "name": "emailAddress",
        "baseName": "emailAddress",
        "type": "string"
        },
        
        {
        "name": "externalId",
        "baseName": "externalId",
        "type": "string"
        },
        
        {
        "name": "id",
        "baseName": "id",
        "type": "number"
        },
        
        {
        "name": "language",
        "baseName": "language",
        "type": "string"
        },
        
        {
        "name": "linkedSpaceId",
        "baseName": "linkedSpaceId",
        "type": "number"
        },
        
        {
        "name": "metaData",
        "baseName": "metaData",
        "type": "{ [key: string]: string; }"
        },
        
        {
        "name": "plannedPurgeDate",
        "baseName": "plannedPurgeDate",
        "type": "Date"
        },
        
        {
        "name": "reference",
        "baseName": "reference",
        "type": "string"
        },
        
        {
        "name": "shippingAddress",
        "baseName": "shippingAddress",
        "type": "Address"
        },
        
        {
        "name": "state",
        "baseName": "state",
        "type": "CreationEntityState"
        },
        
        {
        "name": "version",
        "baseName": "version",
        "type": "number"
        }        
    ];

    static getAttributeTypeMap() {
        return Subscriber.attributeTypeMap;
    }
}

export { Subscriber }
