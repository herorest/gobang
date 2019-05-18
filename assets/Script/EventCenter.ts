export default class EventCenter {

    private static events = {};

    static destroy(){
        this.events = {};
    }

    static registEvent(eventType, callback, context): void{
        this.events[eventType] = {
            callback,
            context
        };
    }

    static postEvent(eventType, msg){
        let postEv = this.events[eventType];
        if(postEv){
            postEv.callback.call(postEv.context, msg);
        }
    }

}
