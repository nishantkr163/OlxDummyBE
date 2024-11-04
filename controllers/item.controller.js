const item = require("../models/item.model")

exports.addNewItem = async (req, res, next) => {

    const { itemName, itemDescription, itemImage, itemPrice, seller } = req.body;

    try {
        const newItem = new item({
            itemName,
            itemDescription,
            itemImage,
            itemPrice,
            seller,
            likes : [],
            comments: []
        })

        await newItem.save();

        return res.status(200).json({
            message : "Your product was published successfully!"
        })
    } catch (error) {
        return res.status(400).json({ message: "Unable to post!" });
    }
}

exports.getAllItems = async (req, res, next) =>  {
    try {
        const allItems = await item.find().populate('seller', 'name _id')
        .exec();
        return res.status(200).json(allItems);
    } catch (error) {
        return res.status(400).json({ message : "Error fetching all Items." })
    }
}

exports.getMySellingItems = async (req, res, next) => {
    
    const { id } = req.params;

    try {
        const myItems = await item.find({ seller : id });
        
        return res.status(200).json(myItems)
        
    } catch (error) {
        
    }
}