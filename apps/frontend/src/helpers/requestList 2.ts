export default class RequestList {
  requests: object[] = [];

  constructor() {
    // Doesn't need to do anything
  }

  addRequestToList(request: object) {
    this.requests.push(request);
  }
}
