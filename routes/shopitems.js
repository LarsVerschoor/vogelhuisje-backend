import express from 'express';

const router = express.Router();

let shopItems = [
    {
        item_id: 1,
        name: "Standaard Vogelhuisje",
        description: "Basismodel van grenenhout",
        price: 19.99,
        image_url: "",
        stock_quantity: 50
    }
];

router.get('/shopitems', (req, res) => {
    res.json({ success: true, data: shopItems });
});

router.get('/:item_id', (req, res) => {
    const item = shopItems.find(i => i.item_id == req.params.item_id);
    if (!item) return res.status(404).json({ success: false, message: 'Item niet gevonden' });
    res.json({ success: true, data: item });
});

router.post('/', (req, res) => {
    const newItem = {
        item_id: shopItems.length + 1,
        name: req.body.name,
        description: req.body.description || "",
        price: req.body.price,
        image_url: req.body.image_url || "",
        stock_quantity: req.body.stock_quantity || 0
    };

    shopItems.push(newItem);
    res.status(201).json({ success: true, data: newItem });
});

router.put('/:item_id', (req, res) => {
    const index = shopItems.findIndex(i => i.item_id == req.params.item_id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Item niet gevonden' });

    shopItems[index] = { ...shopItems[index], ...req.body };
    res.json({ success: true, data: shopItems[index] });
});

router.delete('/:item_id', (req, res) => {
    shopItems = shopItems.filter(i => i.item_id != req.params.item_id);
    res.json({ success: true, message: 'Item verwijderd' });
});

export default router;