
enum conditionType{
    noCondition,
    mapHas
}

export class DBCError {
    public constructor(whence: number,
                       what: string,
                       type: number,    // 0: warning, 1: error
                       token: string = ""){
        this.whence = whence;
        this.what = what;
        this.type = type;
        this.token = token;
        
        this.hasCondition = false;
        this.condition = conditionType.noCondition;
        this.mapVal = null;
        this.key = null;
    }

    public whence: number;  // line number
    public what: string;    // error string
    public type: number;    // 0: warning, 1: error
    public hasCondition: boolean;
    public token: string;

    // condition variables
    private condition: conditionType;
    private mapVal: Map<string,any> | null;
    private key: string|null;

    public evalCondition(){
        // returns false if error needs to be added
        if(!this.hasCondition) return false;

        switch (this.condition) {
            case conditionType.noCondition:
                return false;
            case conditionType.mapHas:
                return this.evalMapCondition();
            default:
                break;
        }
    }

    public addMapCondition(mapVal: Map<string,any>, key: string): boolean{
        this.mapVal = mapVal;
        this.key = key;
        this.condition = conditionType.mapHas;
        this.hasCondition = true;
        return (this.mapVal.has(this.key));
    }

    private evalMapCondition(): boolean{
        if(this.mapVal === null || this.key === null)
            return false;
        else{
            // console.log("checking map condition", this.mapVal, this.key, this.mapVal.has(this.key));
            if(this.mapVal.has(this.key))
                return true;
            else
                return false;
        }
    }

}
