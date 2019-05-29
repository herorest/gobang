// 泛型的单例
export default class Singleton<T> {
    private static _instance = null;

    public static getInstance<T>(c: {new(): T}) : T{
        if(this._instance == null){
            this._instance = new c();
        }
        return this._instance;
    }
}
