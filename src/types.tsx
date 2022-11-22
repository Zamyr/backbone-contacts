export interface ContactType {
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
}

export interface ContactStateType {
    contacts: {[key: string]: any}
}