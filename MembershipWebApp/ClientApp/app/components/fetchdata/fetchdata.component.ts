import { Component, Inject } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];

    constructor(httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        httpClient.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
            //this.forecasts = result.json() as WeatherForecast[];
            this.forecasts = result as WeatherForecast[];
        }, error => console.error(error));
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
