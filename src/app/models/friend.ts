export class Friend {
    constructor(
        public id?: number,
        public active?: boolean,
        public datetimeCreated?: string,
        public requesterId?: number,
        public recipientId?: number
    ) {}
}
