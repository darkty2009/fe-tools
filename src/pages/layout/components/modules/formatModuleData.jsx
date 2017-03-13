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
            define:d.type?require(`../${d.type}.jsx`).default:d.define
        };
        if(d.content){
            item.content = formatToShow(d.content);
        }
        if(d.styles){
            item.styles = d.styles
        }
        if(d.className){
            item.className = d.className
        }
        if(d.properties){
            item.properties = d.properties
        }
        if(d.children){
            item.children = d.children
        }
        return item;
    });
    return result;
}