var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ShoppingListSchema = new Schema({
    title : {
        required : true,
        type : String,
        trim : true
    },
    list_items : {
        type : [String]
    }
})
const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);
module.exports = {
    model : ShoppingList,
    schema : ShoppingListSchema
}