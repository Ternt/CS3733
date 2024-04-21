export type vec2 = {
  x: number;
  y: number;
  z: number;
};
export type node = {
  point: vec2;
  nodeID: string;
  nodeType: string;
  longName: string;
  building?: string;
  shortName?: string;
  floor?: string;
};
export type edge = {
  startNode: node;
  endNode: node;
  heat: number;
};

export type nodesAndEdges = {
  nodes: node[];
  edges: edge[];
};


export type RequestCard = {
    type:string;
}


// ------------------------------- Types used in Kanban Board ------------------------------- //
export type AssignedEmployee = {
    id: number;
    firstName: string;
    lastName: string;
    assignedRequests: ServiceRequest[];
}

export type Node = {
    nodeID: string;
    xcoord: number;
    ycoord: number;
    building: string;
    floor: string;
    longName: string;
    shortName: string;
    nodeType: string;
}

export type GiftRequest = {
    requestID: number;
    senderName: string;
    recipientName: string;
    shippingType: string;
    cardNumber: number;
    cardCVV: number;
    cardHolderName: string;
    cardExpirationDate: string;
}

export type MedicineRequest = {
    requestID: number;
    patientName: string;
    primaryPhysicianName: string;
    medicine: string;
    dosage: number;
    form: string;
    date: string;
}

export type SanitationRequestMessTypes = {
    messType: string;
}

export type SanitationRequest = {
    requestID: number;
    employeeName: string;
    messTypes: SanitationRequestMessTypes[];
    date: string;
}

export type MaintenanceRequest = {
    requestID: number;
    maintenanceType: string;
    workersNeeded: number;
}

export type ServiceRequest = {
    requestID: number,
    priority: string,
    status: string,
    type: string,
    location: Node,
    assignedEmployee?: AssignedEmployee,
    giftDetail?: GiftRequest,
    maintenanceDetail?: MaintenanceRequest,
    sanitationDetail?: SanitationRequest,
    medicineDetail?: MedicineRequest,
    notes?: string,
}
