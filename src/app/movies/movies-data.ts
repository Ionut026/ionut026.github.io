import { InMemoryDbService } from "angular-in-memory-web-api";
import { Movie } from "./movie";

export class MoviesData implements InMemoryDbService {

    createDb() {
        const movies: Movie[] = [
            {
                id: 1,
                name: "Titanic",
                directorName: "James Cameron",
                posterImgUrl: "https://upload.wikimedia.org/wikipedia/ro/2/22/Titanic_poster.jpg",
                releaseDate: new Date(1997, 12, 19),
                rating: 4,
                synopsis: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
                watched: false
            },
            {
                id: 2,
                name: "2001: A Space Odyssey",
                directorName: "Stanley Kubrick",
                posterImgUrl: "https://upload.wikimedia.org/wikipedia/ro/0/0b/2001Style_B.jpg",
                releaseDate: new Date(1968, 4, 2),
                rating: 4.95,
                synopsis: "Humanity finds a mysterious object buried beneath the lunar surface and sets off to find its origins with the help of HAL 9000, the world's most advanced super computer.",
                watched: false
            },
            {
                id: 3,
                name: "The Godfather",
                directorName: "Francis Ford Coppola",
                posterImgUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
                releaseDate: new Date(1972, 3, 24),
                rating: 4.56,
                synopsis: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
                watched: false
            },
            {
                id: 4,
                name: "Citizen Kane",
                directorName: "Francis Ford Coppola",
                posterImgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Citizen_Kane_poster%2C_1941_%28Style_B%2C_unrestored%29.jpg/800px-Citizen_Kane_poster%2C_1941_%28Style_B%2C_unrestored%29.jpg",
                releaseDate: new Date(1941, 9, 5),
                rating: 4.5,
                synopsis: "Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance: 'Rosebud.'",
                watched: false
            },
            {
                id: 5,
                name: "The Dark Knight",
                directorName: "Christopher Nolan",
                posterImgUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
                releaseDate: new Date(2008, 7, 18),
                rating: 4.5,
                synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                watched: false
            }
        ]

        return { movies }
    }


}