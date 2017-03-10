/**
 * Created by lianghj on 2017/3/10.
 */
export function  formatToEdit(data) {
    let result = data.map(function(d,i){
        return {
            title:d.title,
            type:d.define.component,
            content:d.content?formatToEdit(d.content):null,
            style:d.style
        }
    });
    return result;
}
export function  formatToShow(data){
    let result = data.map(function(d,i){
        let item = {
            title:d.title,
            define:require(`../${d.type}.jsx`)
        };
        if(d.content){
            item.content = formatToShow(d.content);
        }
        if(d.style){
            item.style = d.style
        }
        return item;
    });
    return result;
}