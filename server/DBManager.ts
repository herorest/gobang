import Singleton from "./Singleton";
import { MongoClient, Db, Collection } from "mongodb";

// 数据库连接
export default class DBManager extends Singleton<DBManager> {

    db: Db;

    userCollection: Collection;

    connectDB(cb){
        
        // 接入 mongodb
        let dbUrl = "mongodb://localhost:27017";
        MongoClient.connect(dbUrl, (error, db) => {
            if(error){
                console.log(error);
                return;
            }

            this.db = db.db('five');
            
            this.userCollection = this.db.collection('user');
            
            cb && cb();
        });
    }

    static getDb(){
        return DBManager.getInstance(DBManager).db;
    }

    static getUserCollection(){
        return DBManager.getInstance(DBManager).userCollection;
    }
}
