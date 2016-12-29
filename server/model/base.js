var sqlite3 = require('sqlite3').verbose();
var path = require('path');

module.exports = {
    db:function() {
        if(this._db) {
            this._db.close();
            this._db = null;
        }
        this._db = new sqlite3.Database(path.resolve(__dirname, '../database/tools.sqlite3'));
        return this._db;
    },
    close:function() {
        if(this._db) {
            this._db.close();
            this._db = null;
        }
    },
    select:function(where, plus) {
        return new Promise(function(resolve, reject) {
            try {
                where = where || '1=1';
                plus = plus || "";
                var sql = `SELECT * FROM ${this.table} where ${where} ${plus}`;
                console.log(sql);
                this.db().all(sql, function(err, rows) {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(rows);
                    }
                });
            }catch(e) {
                reject(e);
            }finally {
                this.close();
            }
        }.bind(this));
    },
    add:function(data) {
        return new Promise(function(resolve, reject) {
            try {
                var db = this.db();

                var keys = Object.keys(data);
                var values = keys.map(function(key) {
                    return JSON.stringify(data[key]);
                });

                var sql = `INSERT INTO ${this.table}(id,${keys.join(',')}) VALUES(NULL,${values.join(',')})`;
                db.run(sql, function(err) {
                     if(err) {
                         reject(err);
                     }else {
                         resolve(this.lastID);
                     }
                });
            }catch(e) {
                reject(e);
            }finally {
                this.close();
            }
        }.bind(this));
    },
    update:function(data, where) {
        where = where || `id=${data.id}`;

        return new Promise(function(resolve, reject) {
            try {
                var db = this.db();

                var keys = Object.keys(data);
                var values = keys.map(function(key) {
                    return key+"="+JSON.stringify(data[key]);
                });

                var sql = `UPDATE ${this.table} SET ${values.join(',')} WHERE ${where}`;
                console.log(sql);
                db.run(sql, function(err) {
                    if(err) {
                        reject(err);
                    }else {
                        resolve(this.lastID);
                    }
                });
            }catch(e) {
                reject(e);
            }finally {
                this.close();
            }
        }.bind(this));
    }
};
