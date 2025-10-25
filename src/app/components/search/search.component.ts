import { Component } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from "../movie-list/movie-list.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,CommonModule, MovieListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  query = '';
  movies: Movie[] = [];
  loading = false;
  error = '';

  constructor(private movieService: MovieService) {}

  search() {
    if (!this.query.trim()) return;
    this.loading = true;
    this.error = '';

    this.movieService.searchMovies(this.query).subscribe({
      next: res => {
        this.movies = res.results;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch movies.';
        this.loading = false;
      }
    });
  }
}