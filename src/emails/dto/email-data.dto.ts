export class EmailDataDto {
    senderName?: string;
    toAddresses: string[];
    ccAddresses?: string[];
    bccAddresses?: string[];
    subject: string;
    body: string;
    replyToAddresses?: string[];
    source: string;
}