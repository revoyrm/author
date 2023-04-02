export type Label = {
    id: string;
    label: string;
}

export type Book = {
    title: string;
    author: string;
    summary: string;
    label: Label;
}