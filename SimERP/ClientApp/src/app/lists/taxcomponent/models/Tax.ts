export class Tax {
    CreatedBy: number;
    CreatedDate: Date;
    IsActive: boolean;
    ModifyBy?: number;
    ModifyDate?: Date;
    Notes: string;
    SearchString: string;
    SortOrder?: number;
    TaxCode: string;
    TaxId: number;
    TaxName: string;
    TaxPercent: number;
    UserName: string;

    constructor() {
    }
}
