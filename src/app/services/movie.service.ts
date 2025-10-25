import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../app/environments/environment';
import { Movie, MovieSearchResponse } from '../models/movie.model';
import { MovieDetail } from '../models/movie-detail.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private baseUrl = environment.baseUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  searchMovies(query: string, page = 1): Observable<MovieSearchResponse> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', query)
      .set('page', page);

    return this.http.get<MovieSearchResponse>(`${this.baseUrl}/search/movie`, { params });
  }

  getMovieDetails(id: number): Observable<MovieDetail> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get<MovieDetail>(`${this.baseUrl}/movie/${id}`, { params });
  }

  getPopularMovies(): Observable<MovieSearchResponse> {
    return this.http.get<MovieSearchResponse>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`);
  }
}
