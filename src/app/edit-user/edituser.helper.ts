//will help in common utility static functions 
import { UserDetails, Account, Role, AccountActionIndicator } from './edituser.model';
export class EditUserHelper {

    static mapToUserDetails(user: any): UserDetails {
        //return User Object
        return new UserDetails(user.PrincipleId, user.UserId, user.DisplayName, user.Surname,
            user.Forename, user.Initials, user.EmailAddress, user.Country, user.UserLogin);
    }

    static mapToAccount(userClient: any, action: AccountActionIndicator): Account {
        //return Account Object
        //console.log(userClient);
        return new Account(userClient.Id, userClient.PartyId, userClient.PartyName, action);
    }

    static mapToRole(role: any): Role {
        return new Role(role.RoleId, role.RoleCode, role.RoleDescription, role.Rank);
    }


}