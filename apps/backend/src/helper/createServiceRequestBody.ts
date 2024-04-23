
export default function createServiceRequestBody(body): any | undefined {
    if (body === undefined) {
        return undefined;
    }
    if (body.requestID !== undefined) {
        console.error("Not allowed to specify request id. It is auto generated");
        return undefined;
    }

    // delete all detail parameters
    // (Not meant be used from API)
    delete body.sanitationDetail;
    delete body.medicineDetail;
    delete body.maintenanceDetail;
    delete body.giftDetail;

    // check for data corresponding to each service request type
    switch (body.type) {
        case "SANITATION":
            if (!Array.isArray(body.messTypes)) {
                console.error("messTypes must be an array");
                return undefined;
            }
            if (body.messTypes.length == 0) {
                console.error("messTypes must have at least one value");
                return undefined;
            }
            body.sanitationDetail = {
                create: {
                    messTypes: {
                        create: body.messTypes.map((messType: string) => {
                            return {
                                messType: messType,
                            };
                        }),
                    },
                    employeeName: body.employeeName,
                    messSize: body.messSize,
                    date: body.date,
                },
            };
            delete body.employeeName;
            delete body.messTypes;
            delete body.messSize;
            delete body.date;
            break;
        case "MEDICINE":
            body.medicineDetail = {
                create: {
                    patientName: body.patientName,
                    primaryPhysicianName: body.primaryPhysicianName,
                    medicine: body.medicine,
                    dosage: body.dosage,
                    form: body.form,
                    date: body.date,
                },
            };
            delete body.patientName;
            delete body.primaryPhysicianName;
            delete body.medicine;
            delete body.dosage;
            delete body.form;
            delete body.date;
            break;
        case "GIFT":
            if (!Array.isArray(body.items)) {
                console.error("items must be an array");
                return undefined;
            }
            if (body.items.length == 0) {
                console.error("items must have at least one value");
                return undefined;
            }
            body.giftDetail = {
                create: {
                    senderName: body.senderName,
                    recipientName: body.recipientName,
                    shippingType: body.shippingType,

                    cardNumber: body.cardNumber,
                    cardCVV: body.cardCVV,
                    cardHolderName: body.cardHolderName,
                    cardExpirationDate: body.cardExpirationDate,

                    items: {
                        create: body.items.map((itemID: number) => {
                            return {
                                cartItemID: itemID,
                            };
                        }),
                    },
                },
            };
            delete body.senderName;
            delete body.recipientName;
            delete body.shippingType;

            delete body.cardNumber;
            delete body.cardCVV;
            delete body.cardHolderName;
            delete body.cardExpirationDate;

            delete body.items;
            break;
        case "RELIGIOUS":
            body.religiousDetail = {
                create: {
                    requestorName: body.requestorName,
                    religiousLeaderName: body.religiousLeaderName,
                    serviceType: body.serviceType,
                    date: body.date,
                    time: body.time,
                    endLocation: body.endLocation
                },
            };
            delete body.requestorName;
            delete body.religiousLeaderName;
            delete body.serviceType;
            delete body.date;
            delete body.time;
            delete body.endLocation;
            break;
    }

    return body;
}
