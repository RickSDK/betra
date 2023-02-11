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
    public url: string = '';
    public date: string = '';
    public id: string = '';

    constructor(obj: any, num: number) {
        if (obj) {
            this.id = 'item' + num;
            this.row_id = obj.row_id || 0;
            this.type = obj.type || '';
            this.icon = obj.icon || '';
            this.name = obj.name || '';
            this.description = obj.description || '';
            this.created = obj.created || '';
            this.src = obj.src || '';
            this.url = obj.url || '';

            var dt = getDateObjFromJSDate(obj.created);
            this.date = dt.localDate;

            var trimAmount = 180 - this.name.length;
            if (this.description.length > trimAmount) {
                this.description = this.description.substring(0, trimAmount) + '...';
            }

        }
    }
}
