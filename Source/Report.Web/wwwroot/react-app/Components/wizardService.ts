import { http, HttpResponse } from './http';
import { IFormData } from './models';

export interface IService {
    Save(formdata: IFormData): Promise<HttpResponse<any>>;
}

export class WizardService implements IService {
    private _baseUrl: string;
    private readonly GET: string = "GET";
    private readonly POST: string = "POST";
    private readonly _partialUrl: string = "api/wizard";

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    public async Save(formdata: IFormData): Promise<HttpResponse<any>> {
        let response: HttpResponse<any>;
        try {
            const ra = {
                name: formdata.name,
                phone: formdata.phone,
                email: formdata.email,
                alternative: formdata.alternative,
                alt2: formdata.alt2,
                alt1: formdata.alt1,
                connector: formdata.connector,
                description: formdata.description != null ? formdata.description : '',
                approve: formdata.approve
            };

            response = await http<any>(
                `${this._baseUrl}/${this._partialUrl}/save`,
                {
                    method: this.POST,
                    headers: this.getHeaders(),
                    body: JSON.stringify(ra)
                }
            );
            return response;
        }
        catch (exception) {
            this.handleError(exception);
        }

        return Promise.reject("Failed to save formdata.");
    }

    private handleError(exception: any) {
        // TODO: sent to error api endpoint
        console.log("Error", exception);
    }

    private getHeaders(): Headers {
        let aft = document.getElementById('RequestVerificationToken') as HTMLInputElement;
        return new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "RequestVerificationToken": aft.value,
        });
    }
}

export function getService() : IService | null {
    let baseUrl = 'https://localhost:5000';

    let service: IService | null = null;
    if (baseUrl != null) {
        service = new WizardService(baseUrl)
    }
    return service;
};