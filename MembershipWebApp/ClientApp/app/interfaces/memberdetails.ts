export class MemberDetails {
    constructor(
        public ID: number,
        public MemberID: number,
        public ReceiveNewsLetter: boolean,
        public DaysOfWeekAttend: string,
        public DateJoined: Date,
        public MemberLevel: string,
        public MemberFee: number,
        public RenewalReminderDate: Date,
        public IsMemberFeePaid: boolean,
        // extra helper fields.
        public DaysOfWeekAttendSelected: JSON
    ) { }
}
