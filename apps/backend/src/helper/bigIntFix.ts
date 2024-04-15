// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error

// no one touch this, I swear it's necessary
BigInt.prototype.toJSON = function (): string {
    return this.toString();
};
