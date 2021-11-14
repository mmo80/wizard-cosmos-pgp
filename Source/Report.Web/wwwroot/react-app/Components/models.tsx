
export interface IDetails {
    yourDetails: IFormData;
}

export enum Alternative {
    Alt1 = "Beer",
    Alt2 = "Wine",
}

export interface IFormData {
    name: string;
    phone: string;
    email: string;
    alternative?: Alternative;
    alt2?: string;
    alt1?: string;
    connector?: string;
    description?: string;
    approve: boolean;
}

export interface IAlternative {
    label: string;
    value: string;
}

var prefixRoot = "/";
var BASE = prefixRoot + ""; // demo/
export class Routing {
    public static readonly CONTACT = BASE;
    public static readonly ALT = BASE + "step1";
    public static readonly ALT1 = BASE + "step2a";
    public static readonly ALT2 = BASE + "step2b";
    public static readonly CONNECT = BASE + "step3";
    public static readonly DESCRIPTION = BASE + "step4";
    public static readonly SUMMARY = BASE + "steg5";
    public static readonly THANKS = BASE + "thankyou";
}