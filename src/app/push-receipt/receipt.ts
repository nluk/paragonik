export class Receipt {
    title: String;
    description: String;
    imageURL: String;
    constructor(title, description, imageURL) {
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
    }

    getData(): object {
        const result = {};
        Object.keys(this).map(key => result[key] = this[key]);
        return result;
    }


}