export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  genres: { id: number; name: string }[];
  runtime: number;
  release_date: string;
  poster_path: string;
}
