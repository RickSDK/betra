declare var getDateObjFromJSDate: any;
declare var betraImageFromId: any;

export class ScrollItem {
    public row_id: number = 0;
    public type: string = '';
    public icon: string = '';
    public name: string = '';
    public description: string = '';
    public created: string = '';
    public src: string = '';
    public src2: string = '';
    public url: string = '';
    public url2: string = '';
    public date: string = '';
    public id: string = '';
    public cardType: number = 0;

    constructor(obj: any, num: number) {
        if (obj) {
            this.id = 'item' + num;
            this.cardType = obj.cardType || 0;
            this.row_id = obj.row_id || 0;
            this.type = obj.type || '';
            this.icon = obj.icon || '';
            this.name = obj.name || '';
            this.description = obj.description || '';
            this.created = obj.created || '';
            this.src = obj.src || '';
            this.src2 = obj.src2 || '';
            this.url = obj.url || '';
            this.url2 = obj.url2 || '';

            var dt = getDateObjFromJSDate(obj.created);
            this.date = dt.localDate;

            var trimAmount = 180 - this.name.length;
            if (this.description.length > trimAmount) {
                this.description = this.description.substring(0, trimAmount) + '...';
            }

        }
    }
}
