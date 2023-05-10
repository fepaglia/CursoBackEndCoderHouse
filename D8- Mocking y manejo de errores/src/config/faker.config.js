import { faker } from '@faker-js/faker';

faker.locale = 'es';

export const generateProducts = () =>{
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image(),
        code: faker.random.alphaNumeric(10),
        status: faker.datatype.boolean(),
        stock: faker.random.numeric(1),
        _id: faker.database.mongodbObjectId(),
    }
}