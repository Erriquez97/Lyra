export interface Report{
    id:string;
    email: string;
    title: string;
    description:string;
    category: string;
    project: string;
    image:string;
    registrationDate: Date;
    closingDate: Date;
    status:string;
}