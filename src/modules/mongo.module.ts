import { Module } from "@nestjs/common";
import e from "express";
import { Db, MongoClient } from "mongodb";

@Module({
    providers: [
        {
            provide: 'MONGO_CONNECTION',
            useFactory: async (): Promise<Db> => {
                try{
                    const client = await MongoClient.connect('mongodb://localhost', {
                        useUnifiedTopology: true
                    });
                    return client.db('spixelanimations');
                }
                catch(err) {
                    throw e;
                }
            }
        }
    ],
    exports: ['MONGO_CONNECTION']
})
export class MongodbModule{}