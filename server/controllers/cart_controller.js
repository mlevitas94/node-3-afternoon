const swag = require('../models/swag')

module.exports={
    add : (req,res,next)=> {
    const { id } = req.query;
    let { cart } = req.session.user;
    

    const foundItem = cart.find(item => {
        return item.id === id
    })
    

    if(!foundItem){
        const toBeAdded = swag.find(item =>{
            return item.id == id
            });
        cart.push(toBeAdded)
        req.session.user.total += toBeAdded.price;
    }
        res.status(200).send(req.session.user)
    },

    remove : (req,res,next) => {
        const {id} = req.query;
        let {cart}= req.session.user;

        const idOfDelete = cart.findIndex(item =>  {
           return item.id == id
        })

       if(idOfDelete > -1){
        req.session.user.total -= cart[idOfDelete].price
        cart.splice(idOfDelete, 1)
       }

       res.status(200).send(req.session.user)
    },

    checkOut: (req,res,next) => {
        const { user } = req.session;
        user.cart = [];
        user.total = 0;

    res.status(200).send( req.session.user );
    }
}