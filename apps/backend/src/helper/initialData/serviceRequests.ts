export const serviceRequests = [
    {
        requestID: 1,
        type: "SANITATION",
        notes: null,
        locationID: "WELEV00ML1",
        priority: "MEDIUM",
        status: "UNASSIGNED",
        assignedEmployeeID: null,
        sanitationDetail: {
            create: {
                employeeName: "employeeName",
                messSize: "SMALL",
                date: "12/31/2004",
                messTypes: {
                    create: [
                        {
                            messType: "SOLID_WASTE"
                        },
                        {
                            messType: "LIQUID_SPILL"
                        }
                    ]
                }
            },
        },
    },
    {
        requestID: 2,
        type: "MEDICINE",
        notes: "note",
        locationID: "IDEPT00303",
        priority: "EMERGENCY",
        status: "UNASSIGNED",
        assignedEmployeeID: null,
        medicineDetail: {
            create: {
                patientName: "patient name",
                primaryPhysicianName: "physician name",
                medicine: "PARACETAMOL",
                dosage: 12,
                form: "POWDER",
                date: "12/31/2004"
            }
        }
    },
    {
        requestID: 3,
        type: "GIFT",
        notes: null,
        locationID: "FHALL02201",
        priority: "LOW",
        status: "UNASSIGNED",
        assignedEmployeeID: null,
        giftDetail: {
            create: {
                senderName: "Alex Siracusa",
                recipientName: "Alex Gu",
                shippingType: "EXPRESS",
                cardNumber: 123456789012,
                cardCVV: 124,
                cardHolderName: "Alexander Siracusa",
                cardExpirationDate: "12/31/2000",
                items: {
                    create: [
                        {
                            cartItemID: 1
                        },
                        {
                            cartItemID: 2
                        }
                    ]
                }
            }
        }
    },
    {
        requestID: 4,
        type: "GIFT",
        notes: null,
        locationID: "DDEPT00102",
        priority: "HIGH",
        status: "UNASSIGNED",
        assignedEmployeeID: null,
        giftDetail: {
            create: {
                senderName: "Alice Smith",
                recipientName: "Bob Johnson",
                shippingType: "STANDARD",
                cardNumber: 123456789012,
                cardCVV: 123,
                cardHolderName: "Alice Smith",
                cardExpirationDate: "2/2/2222",
                items: {
                    create: [
                        {
                            cartItemID: 6
                        },
                        {
                            cartItemID: 7
                        }
                    ]
                }
            }
        }
    },
    {
        requestID: 5,
        type: "SANITATION",
        notes: "cool notes",
        locationID: "CLABS005L1",
        priority: "MEDIUM",
        status: "ASSIGNED",
        assignedEmployeeID: 8,
        sanitationDetail: {
            create: {
                employeeName: "employeeName",
                messSize: "SMALL",
                date: "3/30/2033",
                messTypes: {
                    create: [
                        {
                            messType: "OTHER"
                        }
                    ]
                }
            }
        }
    },
    {
        requestID: 6,
        type: "MEDICINE",
        notes: "medicine notes",
        locationID: "IDEPT00303",
        priority: "HIGH",
        status: "CLOSED",
        assignedEmployeeID: 2,
        medicineDetail: {
            create: {
                patientName: "patient name",
                primaryPhysicianName: "physician name",
                medicine: "PAIN_KILLERS",
                dosage: 8,
                form: "TAB_OR_CAP",
                date: "8/3/2022"
            }
        }
    },
    {
        requestID: 7,
        type: "MEDICINE",
        notes: "medicine notes",
        locationID: "IDEPT00303",
        priority: "HIGH",
        status: "IN_PROGRESS",
        assignedEmployeeID: 5,
        medicineDetail: {
            create: {
                patientName: "patient name",
                primaryPhysicianName: "physician name",
                medicine: "TYLENOL",
                dosage: 5,
                form: "LIQUID",
                date: "1/2/2034"
            }
        }
    },
]
