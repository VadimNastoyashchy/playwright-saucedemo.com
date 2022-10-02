import { AccountType } from './AccountType';
import ICredentials from './ICredentials';

export default class Credentials {
    private static readonly accountInfo = {
        standard: {
            userName: 'standard_user',
            password: 'secret_sauce'
        },
        locked: {
            userName: 'locked_out_user',
            password: 'secret_sauce'
        },
        problem: {
            userName: 'problem_user',
            password: 'secret_sauce'
        },
        performance: {
            userName: 'performance_glitch_user',
            password: 'secret_sauce'
        },
    };

    public static getUserCredentials(accountType: AccountType): ICredentials {
        return this.accountInfo[accountType];
    }
}