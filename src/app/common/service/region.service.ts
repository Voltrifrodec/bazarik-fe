import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Region } from '../model/region.model';
import { Observable } from 'rxjs';
import { District } from '../model/district.model';

@Injectable({
	providedIn: 'root'
})
export class RegionService {

	private regionUrl = 'http://localhost:8080/api/regions';

	constructor(private http: HttpClient) { }

	getAllRegions(): Observable<Region[]> {
		return this.http.get<Region[]>(this.regionUrl);
	}

	getAllDistrictsByRegionId(regionId: number): Observable<District[]> {
		return this.http.get<District[]>(`${this.regionUrl}/${regionId}/districts`);
	}

	getRegionById(regionId: number): Observable<Region> {
		return this.http.get<Region>(`${this.regionUrl}/${regionId}`);
	}

	createRegion(region: Region): Observable<number> {
		return this.http.post<number>(this.regionUrl, region);
	}

	updateRegion(region: Region): Observable<Region> {
		return this.http.put<Region>(`${this.regionUrl}/${region.id}`, region);
	}

	deleteRegion(regionId: number): Observable<void> {
		return this.http.delete<void>(`${this.regionUrl}/${regionId}`);
	}
}
