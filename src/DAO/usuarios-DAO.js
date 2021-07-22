class UserDao {
    constructor(bd){
        this.bd = bd
    }

    deleteFromEmail(parametroEmail){
        return new Promise((resolve, reject)=>{
            this.bd.all('DELETE FROM USUARIOS WHERE EMAIL = (?)', parametroEmail, (err)=>{
                if(err){
                    reject(err)
                } else{
                    resolve()
                }
            })
        })
    }
}

module.exports = UserDao