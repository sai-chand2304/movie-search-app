import { Component, OnInit } from '@angular/core';
import { MovieDetail } from '../../models/movie-detail.model';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  movie?: MovieDetail;
  imgBaseUrl = environment.imageBaseUrl;

  getGenres(): string {
    if (!this.movie?.genres) return '';
    return this.movie.genres.map(g => g.name).join(', ');
  }

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovieDetails(id).subscribe(res => this.movie = res);
  }
}
