export class FriendRequest {
    constructor(
        public id?: number,
        public active?: boolean,
        public datetimeCreated?: string,
        public senderId?: number,
        public receiverId?: number
    ) {}
}
