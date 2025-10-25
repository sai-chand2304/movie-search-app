import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MovieListComponent,FormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';
  movies: any[] = [];
  recommended: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadRecommended();
  }

  search() {
    if (!this.query.trim()) return;

    this.loading = true;
    this.error = '';
    this.movieService.searchMovies(this.query).subscribe({
      next: res => {
        this.movies = res.results;
        this.loading = false;
      },
      error: err => {
        this.error = 'Error fetching movies!';
        this.loading = false;
      }
    });
  }

  loadRecommended() {
    this.movieService.getPopularMovies().subscribe({
      next: res => {
        // pick 6 random movies from the results
        const results = res.results;
        this.recommended = this.shuffleArray(results).slice(0, 6);
      },
      error: err => {
        console.error('Error fetching recommended movies', err);
      }
    });
  }

  // Utility to shuffle array randomly
  private shuffleArray(array: any[]): any[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
