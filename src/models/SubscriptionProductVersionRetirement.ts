'use strict';
import { SubscriptionProduct } from "./SubscriptionProduct";
import { SubscriptionProductVersion } from "./SubscriptionProductVersion";


class SubscriptionProductVersionRetirement {

        /**
        * The date and time when the object was created.
        */
    'createdOn'?: Date;

        /**
        * A unique identifier for the object.
        */
    'id'?: number;

        /**
        * The ID of the space this object belongs to.
        */
    'linkedSpaceId'?: number;

        /**
        * The product version that is to be retired.
        */
    'productVersion'?: SubscriptionProductVersion;

        /**
        * Whether the subscriptions' termination periods should be respected.
        */
    'respectTerminationPeriods'?: boolean;

        /**
        * The product to which the subscriptions with the retiring product version are to be migrated. If none is defined, the subscriptions are terminated.
        */
    'targetProduct'?: SubscriptionProduct;

        /**
        * The version is used for optimistic locking and incremented whenever the object is updated.
        */
    'version'?: number;


    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    
        {
        "name": "createdOn",
        "baseName": "createdOn",
        "type": "Date"
        },
        
        {
        "name": "id",
        "baseName": "id",
        "type": "number"
        },
        
        {
        "name": "linkedSpaceId",
        "baseName": "linkedSpaceId",
        "type": "number"
        },
        
        {
        "name": "productVersion",
        "baseName": "productVersion",
        "type": "SubscriptionProductVersion"
        },
        
        {
        "name": "respectTerminationPeriods",
        "baseName": "respectTerminationPeriods",
        "type": "boolean"
        },
        
        {
        "name": "targetProduct",
        "baseName": "targetProduct",
        "type": "SubscriptionProduct"
        },
        
        {
        "name": "version",
        "baseName": "version",
        "type": "number"
        }        
    ];

    static getAttributeTypeMap() {
        return SubscriptionProductVersionRetirement.attributeTypeMap;
    }
}

export { SubscriptionProductVersionRetirement }
