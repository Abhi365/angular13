//will help in common utility static functions 
import { Announcement, Account, AnnouncementClient } from './announcements.model';
export class AnnouncementsHelper {

    static mapToAnnouncement(announcements: any): Announcement {
        //return Announcements Object
        return new Announcement(announcements.Title, announcements.Body,
            announcements.ExpiryDate, announcements.WebLinkURL, announcements.DocumentLink,
            announcements.AnnouncementClients, announcements.AllClients, announcements.Id);
    }
    //static mapToAccount(userClient: any, action: AccountActionIndicator): Account {
    static mapToAccount(userClient: any): Account {
        return new Account(userClient.Id, userClient.PartyName, userClient.PartyId);
    }

    static mapToAnnouncementClients(MosaicClientId: string): AnnouncementClient {
        //return Announcements Object

        return new AnnouncementClient(MosaicClientId);
    }
}