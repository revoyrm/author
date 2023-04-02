import { useEffect } from "react";
import { Book } from "../../types/services";
import { useBooks } from "./useBooks";

export function useInitialBooks(books: Book[]) {
    const {updateBooks} = useBooks();
    
    useEffect(() => {
        updateBooks(books);
    }, [])
}