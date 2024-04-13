
export default function createServiceRequestBody(body): any | undefined {
    if (body === undefined) {
        return undefined;
    }
    if (body.id !== undefined) {
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
            body.sanitationDetail = {
                create: {
                    messType: body.messType,
                    messSize: body.messSize,
                },
            };
            delete body.messType;
            delete body.messSize;
            break;
        case "MEDICINE":
            body.medicineDetail = {
                create: {
                    patientName: body.patientName,
                    primaryPhysicianName: body.primaryPhysicianName,
                    medicine: body.medicine,
                    dosage: body.dosage,
                    form: body.form,
                },
            };
            delete body.patientName;
            delete body.primaryPhysicianName;
            delete body.medicine;
            delete body.dosage;
            delete body.form;
            break;
        case "GIFT":
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
    }

    return body
}
