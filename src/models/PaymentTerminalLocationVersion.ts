'use strict';
import { PaymentTerminalAddress } from "./PaymentTerminalAddress";
import { PaymentTerminalLocation } from "./PaymentTerminalLocation";
import { PaymentTerminalLocationVersionState } from "./PaymentTerminalLocationVersionState";


class PaymentTerminalLocationVersion {

        /**
        * The postal address of the location where the payment terminals are used.
        */
    'address'?: PaymentTerminalAddress;

        /**
        * The contact details if the person responsible for the payment terminals at this location.
        */
    'contactAddress'?: PaymentTerminalAddress;

        /**
        * The ID of the user the payment terminal location version was created by.
        */
    'createdBy'?: number;

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
        * The payment terminal location that the version belongs to.
        */
    'location'?: PaymentTerminalLocation;

        /**
        * The date and time when the object is planned to be permanently removed. If the value is empty, the object will not be removed.
        */
    'plannedPurgeDate'?: Date;

        /**
        * The object's current state.
        */
    'state'?: PaymentTerminalLocationVersionState;

        /**
        * The version is used for optimistic locking and incremented whenever the object is updated.
        */
    'version'?: number;

        /**
        * Whether payment terminals are immediately updated to this configuration version. If not, it will be applied during the maintenance window.
        */
    'versionAppliedImmediately'?: boolean;


    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    
        {
        "name": "address",
        "baseName": "address",
        "type": "PaymentTerminalAddress"
        },
        
        {
        "name": "contactAddress",
        "baseName": "contactAddress",
        "type": "PaymentTerminalAddress"
        },
        
        {
        "name": "createdBy",
        "baseName": "createdBy",
        "type": "number"
        },
        
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
        "name": "location",
        "baseName": "location",
        "type": "PaymentTerminalLocation"
        },
        
        {
        "name": "plannedPurgeDate",
        "baseName": "plannedPurgeDate",
        "type": "Date"
        },
        
        {
        "name": "state",
        "baseName": "state",
        "type": "PaymentTerminalLocationVersionState"
        },
        
        {
        "name": "version",
        "baseName": "version",
        "type": "number"
        },
        
        {
        "name": "versionAppliedImmediately",
        "baseName": "versionAppliedImmediately",
        "type": "boolean"
        }        
    ];

    static getAttributeTypeMap() {
        return PaymentTerminalLocationVersion.attributeTypeMap;
    }
}

export { PaymentTerminalLocationVersion }
