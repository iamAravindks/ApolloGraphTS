import { Publisher } from "./graphql/types"

interface BookDb 
{
    title: string,
    id: string,
    name: string,
    subject?: Array<string>,
    colors?: Array<string>,
    publisher: string
}
export interface Book
{
    title: string
    id: string
    name: string
    publisher: string
}
export // Internal enum values
    const INTERNAL_STATUS = {
        TODO: 'incomplete',
        IN_PROGRESS: 'active',
        DONE: 'completed',
    };

export const Book_data: Array<BookDb> = [
    {
        title: "Book 1",
        id: "1",
        name: "Author 1",
        subject: ["Subject A", "Subject B"],
        publisher: "100"
    },
    {
        title: "Book 2",
        id: "2",
        name: "Author 2",
        subject: ["Subject C", "Subject D"],
        publisher: "100"

    },
    {
        title: "Book 3",
        id: "3",
        name: "Author 3",
        subject: ["Subject E", "Subject F"],
        publisher: "101"

    },
    {
        title: "Book 4",
        id: "4",
        name: "Author 4",
        colors: ["Color Red", "Color Blue"],
        publisher: "101"

    },
    {
        title: "Book 5",
        id: "5",
        name: "Author 5",
        colors: ["Color Green", "Color Yellow"],
        publisher: "102"

    },
    {
        title: "Book 6",
        id: "6",
        name: "Author 6",
        colors: ["Color Orange", "Color Purple"],
        publisher: "102"

    }
];
export const Publishers: Array<Publisher> = [
    {
        id: "100",
        name: "Publisher 1",
        books: ["1", "2"]
    },
    {
        id: "101",
        name: "Publisher 2",
        books: ["3", "4"]
    },
    {
        id: "102",
        name: "Publisher 3",
        books: ["5", "6"]
    },
]
export const curr_readings = [

    {
        id: "1",
        readStatus: INTERNAL_STATUS.DONE
    },
    {
        id: "2",
        readStatus: INTERNAL_STATUS.IN_PROGRESS
    },
    {
        id: "3",
        readStatus: INTERNAL_STATUS.TODO
    }
]