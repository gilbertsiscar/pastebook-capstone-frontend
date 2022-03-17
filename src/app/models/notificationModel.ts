export class NotificationModel {
    constructor(
        public id?: number,
        public user?: string,
        public action?: string,
        public post_id?: string,
        public isRead?: boolean,
        public datetimeCreated?: Date

    ) {}
}
