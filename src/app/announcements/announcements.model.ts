import { AnnouncementsHelper } from './announcements.helper';


export class AnnouncementClient {
    MosaicClientId: string;
    constructor(MosaicClientId: string) {
        this.MosaicClientId = MosaicClientId;
    }
}

//export class ClientInfo {
export class Announcement {
    Title: string;
    Body: string;
    ExpiryDate: string;
    WebLinkURL: string;
    AllClients: boolean;
    Id: string;
    DocumentLink: Array<AnnouncementDocumentLink>;
    AnnouncementClient: Array<AnnouncementClient>;

    // IsEdit: boolean;
    // IsDelete : boolean;

    constructor(Title: string, Body: string, ExpiryDate: string, WebLinkURL: string, DocumentLink: Array<AnnouncementDocumentLink>, AnnouncementClient: any, AllClients: boolean, Id: string) {
        this.Title = Title;
        this.Body = Body;
        this.ExpiryDate = ExpiryDate;
        this.WebLinkURL = WebLinkURL;
        this.DocumentLink = DocumentLink;
        this.AllClients = AllClients;
        this.AnnouncementClient = new Array<AnnouncementClient>();
        if (AnnouncementClient !== null && AnnouncementClient !== undefined)
            AnnouncementClient.forEach((announcementClientId) => {
                this.AnnouncementClient
                    .push(AnnouncementsHelper.mapToAnnouncementClients(announcementClientId));
            });
        this.Id = Id;
    }
}

export class Account {
    Id: string;
    PartyName: string;
    PartyId: number;

    constructor(Id: string, PartyName: string, PartyId: number) {
        this.Id = Id;
        this.PartyName = PartyName;
        this.PartyId = PartyId;

    }
}

export class AnnouncementDocumentLink {
    AnnouncementId: string;
    DocumentLinkIndex: number;
    DocumentKey: string;
    DocumentTitle: string;
    DocumentURL: string;


    constructor(AnnouncementId: string, DocumentLinkIndex: number, DocumentKey: string, DocumentTitle: string, DocumentURL: string) {
        this.AnnouncementId = AnnouncementId;
        this.DocumentLinkIndex = DocumentLinkIndex;
        this.DocumentKey = DocumentKey;
        this.DocumentTitle = DocumentTitle;
        this.DocumentURL = DocumentURL;

    }
}





