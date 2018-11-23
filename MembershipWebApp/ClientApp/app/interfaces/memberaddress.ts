export class MemberAddress {
    constructor(
        public ID: number,
        public MemberID: number,
        public AddressLine1: string,
        public AddressLine2: string,
        public Suburb: string,
        public State: string,
        public PostCode: string
    ) { }
}
