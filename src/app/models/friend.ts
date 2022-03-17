export class Friend {
    constructor(
        public id?: number,
        public active?: boolean,
        public datetimeCreated?: string,
        public requesterId?: number,
        public recipientId?: number
    ) {}
}

export class friendStatus {
    constructor(
        public id?: number,
        public profileUrl?: string,
        public online?: boolean,
        public firstName?: string,
        public lastName?: string,
        public aboutMe?: string
    ) {}
}
