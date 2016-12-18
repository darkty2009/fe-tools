export default obj=>{
    if(!obj) {
        return true;
    }
    return !Object.keys(obj).length;
}
