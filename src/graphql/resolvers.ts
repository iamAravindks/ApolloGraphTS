import { GraphQLError } from "graphql";
import { PubSub } from "graphql-subscriptions";
import { Book_data, INTERNAL_STATUS, Publishers, curr_readings } from "../db";
import { Publisher } from "./types";
import { withFilter } from 'graphql-subscriptions';

interface CreateBookInput
{
    title: string
    id: string
    name: string
    publisher_id: string
    subject?: Array<string>
    colors?: Array<string>
    publisher_name: string
}
interface Book
{
    title: string
    id: string
    name: string
    publisher: string
    subject?: Array<string>
    colors?: Array<string>
}

const pubSub = new PubSub()



const commonResolvers = {
    publisher(parent: { publisher: string })
    {
        const id = parent.publisher;
        const res = Publishers.find(item => item.id === id) as Publisher
        delete res?.books;

        return res

    }
}
export const resolvers = {
    Result: {
        __resolveType(parent: { colors?: Array<string>, subject?: Array<string> })
        {
            if (parent.colors) return 'ColorBook';
            if (parent.subject) return 'TextBook';
            return null
        },
    },
    ColorBook: {
        ...commonResolvers,

    },
    TextBook: {
        ...commonResolvers,

    },
    Publisher: {
        books(parent: { books: Array<string> })
        {

            const books = parent.books
            const formattedBooks = books.map((book: string) => Book_data.find(item => item.id === book))
            return formattedBooks
        }
    },
    Query: {
        books()
        {
            return Book_data
        },
        getMyReading()
        {
            return curr_readings;
        },
        getBook(_parent: unknown, args: { id: string })
        {

            const id = args.id

            const book = Book_data.find(item => item.id === id)

            if (book) {
                return book
            } {
                throw new GraphQLError(`Book with ${id} is not found`, {
                    extensions: {
                        code: "BOOK_NOT_FOUND",
                        argumentId: id,
                        http: {
                            status: 404,
                        }
                    }
                })
            }

        },
        getPublisher(_parent: unknown, args: { id: string })
        {
            const id = args.id
            const publisher = Publishers.find(item => item.id === id)
            return publisher
        }
    },

    Mutation: {

        changeReadStatus(parent: unknown, args: { userReadInput: { id: string, readStatus: string } })
        {
            const { userReadInput } = args;
            const { id, readStatus } = userReadInput;
            const index = curr_readings.findIndex(el => el.id === id)

            if (index === -1) throw new Error("Not found");

            curr_readings[index].readStatus = readStatus;

            const book = Book_data.find(item => item.id === id)
            const readStatusResult = {
                id: curr_readings[index].id,
                readStatus: curr_readings[index].readStatus,
                book: book,
            };

            return readStatusResult
        },
        createBookByPublisher(_parent: unknown, args: { createBookInput: CreateBookInput })
        {

            const createBookInput = args.createBookInput
            const newBook: Book = {
                title: createBookInput.title,
                id: createBookInput.id,
                name: createBookInput.name,
                publisher: createBookInput.publisher_id
            }

            if (createBookInput.colors) {
                newBook.colors = createBookInput.colors
            } else if (createBookInput.subject) {
                newBook.subject = createBookInput.subject
            } else {
                throw new GraphQLError("Invalid User input", {
                    extensions: {
                        code: "INVALID_USER_INPUT",
                        message: "Check whether it have colors or subject",
                        http: {
                            status: 422
                        }
                    }
                })
            }



            Book_data.push(newBook)
            // Publishers.push(newPublisher)
            const pub_ind = Publishers.findIndex(item => item.id === createBookInput.publisher_id)

            Publishers[pub_ind].books?.push(createBookInput.id)

            pubSub.publish('BOOK_PUBLISHED', {
                bookFeed: newBook
            })

            return newBook
        }

    },
    Subscription: {

        bookFeed: {
            subscribe: withFilter(
                () => pubSub.asyncIterator(["BOOK_PUBLISHED"]),
                (payload, variables) =>
                {
                    return payload.bookFeed.publisher === variables.pub_id
                }
            )
        }
    },

    ReadStatus: {
        book(parent: { id: string },)
        {


            return Book_data.filter(item => item.id === parent.id)[0]
        },
        NB(parent: { id: string, readStatus: string })
        {
            return `You did a good job on making Book ${parent.id} to ${parent.readStatus}`
        }
    },

    Status: {
        TODO: INTERNAL_STATUS.TODO,
        IN_PROGRESS: INTERNAL_STATUS.IN_PROGRESS,
        DONE: INTERNAL_STATUS.DONE
    }

}