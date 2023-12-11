const errorManager = (err, req, res, next) => {

    console.log(err)
    res.status(500).send("Internal Server Error")

}
//それぞれのアクションtry catchの　catch(e)にnext(e)を追加することで、エラーの管理がここでできる
//async のパラメータにnextを渡す

module.exports = errorManager