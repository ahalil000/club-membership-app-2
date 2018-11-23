export class Member {
    constructor(
        public ID: number,
        public FirstName: string,
        public LastName: string,
        public EmailAddress: string,
        public ContactNumber: string,
        public DateOfBirth: Date,
        public AccountStatus: string
    ) { }
}
