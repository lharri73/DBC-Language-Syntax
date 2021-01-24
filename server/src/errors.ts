
enum conditionType{
    noCondition,
    mapHas
}

export class DBCError {
    public constructor(whence: number,
                       what: string,
                       type: number,    // 0: warning, 1: error
                       hasCondition: boolean = false,
                       token: string = ""){
        this.whence = whence;
        this.what = what;
        this.type = type;
        this.hasCondition = hasCondition;
        this.token = token;

        this.condition = conditionType.noCondition;
        this.mapVal = null;
        this.key = null;
    }

    public whence: number;  // line number
    public what: string;    // error string
    public type: number;    // 0: warning, 1: error
    public hasCondition: boolean;
    public token: string;

    public evalCondition(){
        // returns false if error needs to be added

        switch (this.condition) {
            case conditionType.noCondition:
                return false;
            case conditionType.mapHas:
                return this.evalMapCondition();
            default:
                break;
        }
    }

    public addMapCondition(mapVal: Map<any,any>, key: any): boolean{
        this.mapVal = mapVal;
        this.key = key;
        this.condition = conditionType.mapHas;
        return(mapVal.has(key));
    }

    // condition variables
    private condition: conditionType;
    private mapVal: Map<any,any> | null;
    private key: any;

    private evalMapCondition(): boolean{
        if(this.mapVal === null)
            return false;
        else
            return this.mapVal.has(this.key);
    }

}
