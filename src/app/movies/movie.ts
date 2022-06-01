export interface Movie {
    id: number;
    name: string;
    releaseDate: Date | null
    posterImgUrl: string;
    directorName: string;
    watched: boolean;
    rating: number;
    synopsis: string;
}