//try catchをまとめるためのファイル
const asyncMiddleware = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
        /* Promise.resolveは問題なく解決した場合
        下記コードは、4行目のコードを細かく書いたバージョン
        Promise.resolve(fn(req, res, next)).catch((err)=> {
            next(err)
        })
        */
    }
}

/*下記の書き方も可能
const asyncMiddleware = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

*/

module.exports = asyncMiddleware